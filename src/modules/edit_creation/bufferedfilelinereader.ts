export class BufferedFileLineReader {
    bufferOffset = 0;
    callback: (line: string) => void = () => undefined;
    currentLine = '';
    decodeOptions: TextDecodeOptions = { 'stream': true };
    decoder = new TextDecoder('utf-8', { 'ignoreBOM': true });
    endCallback: () => void = () => undefined;
    lastBuffer: Uint8Array | undefined;
    offset = 0;
    omittedCR = false;
    reader = new FileReader();
    sawCR = false;
  
    readonly _error = (event: Event): void => {
      throw event;
    };
  
    readonly _readFromView = (dataArray: Uint8Array, offset: number): void => {
      for (let i = offset; i < dataArray.length; i++) {
        // Treats LF and CRLF as line breaks
        if (dataArray[i] == 0x0A) {
          // Line feed read
          const lineEnd = (this.sawCR ? i - 1 : i);
          if (lineEnd > 0) {
            this.currentLine += this.decoder.decode(dataArray.slice(this.bufferOffset, lineEnd), this.decodeOptions);
          }
          this.callback(this.currentLine);
          this.decoder.decode(new Uint8Array([]));
          this.currentLine = '';
          this.sawCR = false;
          this.bufferOffset = i + 1;
          this.lastBuffer = dataArray;
        } else if (dataArray[i] == 0x0D) {
          if (this.omittedCR) {
            this.currentLine += '\r';
          }
          this.sawCR = true;
        } else if (this.sawCR) {
          if (this.omittedCR) {
            this.currentLine += '\r';
          }
          this.sawCR = false;
        }
        this.omittedCR = false;
      }
  
      if (this.bufferOffset != dataArray.length) {
        // Decode the end of the line if no current line was reached
        const lineEnd = (this.sawCR ? dataArray.length - 1 : dataArray.length);
        if (lineEnd > 0) {
          this.currentLine += this.decoder.decode(dataArray.slice(this.bufferOffset, lineEnd), this.decodeOptions);
        }
        this.omittedCR = this.sawCR;
      }
    };
  
    readonly _viewLoaded = (): void => {
      if (!this.reader.result) {
        this.endCallback();
      }
  
      const dataArray = new Uint8Array(this.reader.result as ArrayBuffer);
      if (dataArray.length > 0) {
        this.bufferOffset = 0;
        this._readFromView(dataArray, 0);
        this.offset += dataArray.length;
        const s = this.file.slice(this.offset, this.offset + 256);
        this.reader.readAsArrayBuffer(s);
      } else {
        if (this.currentLine.length > 0) {
          this.callback(this.currentLine);
        }
        this.decoder.decode(new Uint8Array([]));
        this.currentLine = '';
        this.sawCR = false;
        this.endCallback();
      }
    }
  
    constructor(private file: File) {
      this.reader.addEventListener('load', this._viewLoaded);
      this.reader.addEventListener('error', this._error);
    }
  
    public readLines(callback: (line: string) => void, endCallback: () => void) {
      this.callback = callback;
      this.endCallback = endCallback;
      const slice = this.file.slice(this.offset, this.offset + 8192);
      this.reader.readAsArrayBuffer(slice);
    }
  }