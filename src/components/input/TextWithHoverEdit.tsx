import React, { useEffect, useRef, useState } from "react";
import Button from "./Button";

interface Props {
  initialText: string;
  updateText: (text: string) => void;
}

const TextWithHoverEdit: React.FC<Props> = ({ initialText, updateText }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(initialText);
  const [text, setText] = useState<string>(initialText);
  const [isHovering, setIsHovering] = useState<boolean>(false);
  const inputRef = useRef(null);


  const handleTextDoubleClick = () => {
    setIsEditing(true);
  };

//   const handleTextBlur = async () => {
//     handleOkClick();
//   };

  const handleTextChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedText(event.currentTarget.value);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedText(text);
    setIsHovering(false)
  };

  const handleOkClick = () => {
    console.log("ok click happened");
    setText(editedText)
    setIsEditing(false);
    updateText(editedText)
    setIsHovering(false)
    // call your function to update the text
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter") {
      handleOkClick();
    }
  };

  useEffect(() => {
    if(inputRef?.current?.style != null){
        // set the height of the input field to auto to prevent it from scrolling
        inputRef.current.style.height = "auto";
        // set the height of the input field to its scroll height
        inputRef.current.style.height = `${inputRef.current.scrollHeight}px`;
    }
           
  }, [editedText, isEditing]);

  return (
    <>
    <div
      style={{ display: "inline-block", position: "relative", cursor: "text", backgroundColor: isHovering && !isEditing? "#D3D3D3": "white"}}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {isEditing ? (
        <>
        <textarea autoFocus 
            ref={inputRef}
        //   type="text"
          value={editedText}
          onChange={handleTextChange}
        //   onBlur={handleTextBlur}
          onKeyDown={handleKeyPress}
          style={{
            display: "inline-block",
            flex: "grow",
            borderRadius: "3px",
            padding: "2px",
            width: "450px",
            minWidth: "450px",
            border: "1px solid #ccc",
            resize: "none",
            overflow: "hidden",
            alignContent: "center",
          }}
        />
        <br />
        <Button purpose={"primary"} onClick={handleOkClick}>OK</Button> 
        <Button purpose={"light"} onClick={handleCancelClick}>Cancel</Button>
          </>
      ) : (
        <>
          <span
            onDoubleClick={handleTextDoubleClick}
            style={{
              borderBottom: "1px dotted gray",
              display: "inline-block",
              padding: "2px",
              margin: "2px",
              minWidth: "450px",
              textAlign: "left"
            }}
          >
            {text}
          </span>
          <div
            style={{
              position: "absolute",
              right: "-20px",
              top: "0",
              display: "none",
            }}
            className="edit-icon"
          >
            <i className="fa fa-edit"></i>
          </div>
         
        </>
      )}
    </div>
     <br />
     <br />
     <br />
     </>
  );
};

export default TextWithHoverEdit;