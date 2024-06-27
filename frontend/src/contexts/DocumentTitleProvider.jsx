import { useEffect, useState } from "react"
import { DocumentTitleContext } from "./contexts"
import PropTypes from 'prop-types'

const DocumentTitleProvider = ({ children }) => {
  const [title, setTitle] = useState('')

  useEffect(() => {
    document.title = title == '' ? 'Nomadking' : `${title} - Nomadking`
  }, [title])

  return (
    <DocumentTitleContext.Provider value={setTitle}>
      {children}
    </DocumentTitleContext.Provider>
  )
}

DocumentTitleProvider.propTypes = {
  children: PropTypes.node.isRequired,
}

export default DocumentTitleProvider