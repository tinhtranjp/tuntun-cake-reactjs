export default function HtmlRender({ htmlString }) {
  return <div dangerouslySetInnerHTML={{ __html: htmlString }} />
}
