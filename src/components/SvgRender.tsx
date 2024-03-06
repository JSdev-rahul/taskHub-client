import React from "react"
import { ReactSVG } from "react-svg"
import { iSVGImageProps } from "../utils/componentProps"

const SVGImage: React.FC<iSVGImageProps> = ({ src, title }) => (
  <ReactSVG title={title} loading={() => <span>Loading</span>} src={src} />
)

export default SVGImage
