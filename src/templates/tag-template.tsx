import React from "react"

export default function TagTemplate({ pageContext: { tag } }) {
  return (
      <h1>Tag: {tag}</h1>
  )
}
