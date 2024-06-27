import { useContext } from "react"
import { DocumentTitleContext } from "../contexts/contexts"

export const useDocumentTitle = () => {
  return useContext(DocumentTitleContext)
}

export default useDocumentTitle
