import { BioseqSetCreationDocument } from "../../client/models/BioseqSetCreationDocument"

export type SectionProps = {
    document: BioseqSetCreationDocument
    setDocument?: React.Dispatch<React.SetStateAction<BioseqSetCreationDocument | undefined>>
}