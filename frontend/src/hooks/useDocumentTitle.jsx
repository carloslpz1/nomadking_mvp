import { useContext } from "react"
import { DocumentTitleContext } from "../contexts/contexts"

const useDocumentTitle = () => {
  return useContext(DocumentTitleContext)
}

export default useDocumentTitle
