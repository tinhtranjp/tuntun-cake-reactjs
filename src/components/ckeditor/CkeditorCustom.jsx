import { axiosClient } from "@/service/axiosClient"
import { CKEditor } from "@ckeditor/ckeditor5-react"
import { Typography } from "@mui/material"
import {
  // Alignment & Indentation
  Alignment,
  AutoImage,
  AutoLink,
  BlockQuote,
  // Text Formatting
  Bold,
  ClassicEditor,
  // Clipboard
  Clipboard,
  Code,
  CodeBlock,
  // Enter & Shift Enter
  Enter,
  // Essential
  Essentials,
  // Find & Replace
  FindAndReplace,
  FontBackgroundColor,
  FontColor,
  FontFamily,
  // Font Styling
  FontSize,
  // HTML Support (required by Style)
  GeneralHtmlSupport,
  // Headings & Structure
  Heading,
  // Highlight & Code
  Highlight,
  HorizontalLine,
  // Images
  Image,
  ImageCaption,
  ImageInsert,
  ImageResize,
  ImageStyle,
  ImageTextAlternative,
  ImageToolbar,
  ImageUpload,
  Indent,
  IndentBlock,
  Italic,
  // Links
  Link,
  LinkImage,
  // Lists
  List,
  // Media
  MediaEmbed,
  PageBreak,
  Paragraph,
  // Paste from Office
  PasteFromOffice,

  // Remove Format
  RemoveFormat,
  // Select All
  SelectAll,
  ShiftEnter,
  // Source Editing
  SourceEditing,
  // Special Characters
  SpecialCharacters,
  SpecialCharactersArrows,
  SpecialCharactersCurrency,
  SpecialCharactersEssentials,
  SpecialCharactersLatin,
  SpecialCharactersMathematical,
  SpecialCharactersText,
  Strikethrough,
  // Style Plugin
  Style,
  Subscript,
  Superscript,
  // Tables
  Table,
  TableCaption,
  TableCellProperties,
  TableColumnResize,
  TableProperties,
  TableToolbar,
  // Text Transformation
  TextTransformation,
  TodoList,
  // Typing
  Typing,
  Underline,
  // Undo
  Undo,
} from "ckeditor5"
import "ckeditor5/ckeditor5.css"
import "./ck.css"

function CkeditorCustom({ folder, label = "Mô tả", messError, onChange, value }) {
  function MyUploadAdapterPlugin(editor) {
    editor.plugins.get("FileRepository").createUploadAdapter = (loader) => {
      return {
        upload() {
          return loader.file.then(
            (file) =>
              new Promise((resolve, reject) => {
                const data = new FormData()
                data.append("file", file)
                data.append("folder", folder)

                axiosClient
                  .post("/images/upload-img", data, {
                    headers: { "Content-Type": "multipart/form-data" },
                  })
                  .then((res) => resolve({ default: res.url }))
                  .catch(reject)
              }),
          )
        },
        abort() {},
      }
    }
  }

  return (
    <div>
      <Typography
        marginBottom={1}
        marginLeft={2}
        sx={(theme) => ({
          color: messError ? theme.palette.error.main : "",
        })}
      >
        {label}
      </Typography>

      <CKEditor
        editor={ClassicEditor}
        config={{
          licenseKey: "GPL",
          plugins: [
            // Essential
            Essentials,
            Paragraph,
            Heading,

            // Text Formatting
            Bold,
            Italic,
            Underline,
            Strikethrough,
            Code,
            Subscript,
            Superscript,

            // Font
            FontSize,
            FontFamily,
            FontColor,
            FontBackgroundColor,

            // Highlight & Code
            Highlight,
            CodeBlock,

            // Structure
            BlockQuote,
            HorizontalLine,
            PageBreak,

            // Alignment
            Alignment,
            Indent,
            IndentBlock,

            // Images
            Image,
            ImageCaption,
            ImageStyle,
            ImageToolbar,
            ImageUpload,
            ImageResize,
            ImageTextAlternative,
            ImageInsert,
            AutoImage,

            // Links
            Link,
            LinkImage,
            AutoLink,

            // Lists
            List,
            TodoList,

            // Tables
            Table,
            TableToolbar,
            TableProperties,
            TableCellProperties,
            TableColumnResize,
            TableCaption,

            // Media
            MediaEmbed,

            // Special Characters
            SpecialCharacters,
            SpecialCharactersEssentials,
            SpecialCharactersArrows,
            SpecialCharactersCurrency,
            SpecialCharactersLatin,
            SpecialCharactersMathematical,
            SpecialCharactersText,

            // Find & Replace
            FindAndReplace,

            // Source Editing
            SourceEditing,

            // Paste from Office
            PasteFromOffice,

            // Remove Format
            RemoveFormat,

            // Text Transformation
            TextTransformation,

            // Core features
            Typing,
            Enter,
            ShiftEnter,
            SelectAll,
            Undo,
            Clipboard,

            // Style Plugin
            Style,

            // HTML Support (required by Style)
            GeneralHtmlSupport,

            // Custom Upload
            MyUploadAdapterPlugin,
          ],
          toolbar: {
            items: [
              "heading",
              "|",
              "style",
              "|",
              "fontSize",
              "fontFamily",
              "fontColor",
              "fontBackgroundColor",
              "|",
              "bold",
              "italic",
              "underline",
              "strikethrough",
              "subscript",
              "superscript",
              "code",
              "|",
              "highlight",
              "removeFormat",
              "|",
              "alignment",
              "outdent",
              "indent",
              "|",
              "bulletedList",
              "numberedList",
              "todoList",
              "|",
              "link",
              "imageUpload",
              "mediaEmbed",
              "insertTable",
              "|",
              "blockQuote",
              "codeBlock",
              "horizontalLine",
              "pageBreak",
              "|",
              "specialCharacters",
              "findAndReplace",
              "|",
              "sourceEditing",
              "|",
              "undo",
              "redo",
            ],
            shouldNotGroupWhenFull: true,
          },
          specialCharacters: {
            order: ["Emoji", "Text", "Latin", "Mathematical", "Currency", "Arrows"],
          },
          // HTML Support config
          htmlSupport: {
            allow: [
              {
                name: /.*/,
                attributes: true,
                classes: true,
                styles: true,
              },
            ],
          },

          // Style config
          style: {
            definitions: [
              // Text styles
              {
                name: "Text đỏ",
                element: "span",
                classes: ["text-red"],
              },
              {
                name: "Text xanh",
                element: "span",
                classes: ["text-blue"],
              },
              {
                name: "Text vàng highlight",
                element: "span",
                classes: ["text-highlight", "bg-yellow"],
              },
              {
                name: "Text in đậm custom",
                element: "span",
                classes: ["font-bold", "text-dark"],
              },

              // Paragraph styles
              {
                name: "Đoạn văn nổi bật",
                element: "p",
                classes: ["lead-text", "mb-4"],
              },
              {
                name: "Đoạn văn nhỏ",
                element: "p",
                classes: ["small-text", "text-muted"],
              },
              {
                name: "Đoạn văn trung tâm",
                element: "p",
                classes: ["text-center", "py-3"],
              },
              {
                name: "Quote đặc biệt",
                element: "p",
                classes: ["quote-special", "border-left", "pl-4"],
              },

              // Div containers
              {
                name: "Box cảnh báo",
                element: "div",
                classes: ["alert", "alert-warning", "p-3"],
              },
              {
                name: "Box thông tin",
                element: "div",
                classes: ["info-box", "border", "p-4", "rounded"],
              },
              {
                name: "Box thành công",
                element: "div",
                classes: ["success-box", "bg-green-light", "p-3"],
              },

              // List styles
              {
                name: "List đặc biệt",
                element: "ul",
                classes: ["custom-list", "list-styled"],
              },
              {
                name: "List inline",
                element: "ul",
                classes: ["list-inline", "mb-0"],
              },
            ],
          },

          // Heading config
          heading: {
            options: [
              { model: "paragraph", title: "Paragraph", class: "ck-heading_paragraph" },
              { model: "heading1", view: "h1", title: "Heading 1", class: "ck-heading_heading1" },
              { model: "heading2", view: "h2", title: "Heading 2", class: "ck-heading_heading2" },
              { model: "heading3", view: "h3", title: "Heading 3", class: "ck-heading_heading3" },
              { model: "heading4", view: "h4", title: "Heading 4", class: "ck-heading_heading4" },
            ],
          },

          // Font config
          fontSize: {
            options: [9, 10, 11, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34, 36],
          },

          fontFamily: {
            options: [
              "default",
              "Arial, Helvetica, sans-serif",
              "Courier New, Courier, monospace",
              "Georgia, serif",
              "Lucida Sans Unicode, Lucida Grande, sans-serif",
              "Tahoma, Geneva, sans-serif",
              "Times New Roman, Times, serif",
              "Trebuchet MS, Helvetica, sans-serif",
              "Verdana, Geneva, sans-serif",
            ],
          },

          // Image config
          image: {
            toolbar: [
              "imageStyle:inline",
              "imageStyle:alignLeft",
              "imageStyle:alignCenter",
              "imageStyle:alignRight",
              "imageStyle:block",
              "imageStyle:side",
              "|",
              "resizeImage",
              "|",
              "imageTextAlternative",
              "linkImage",
              "|",
              "imageCaption",
            ],
            resizeOptions: [
              {
                name: "resizeImage:original",
                label: "Original size",
                value: null,
              },
              {
                name: "resizeImage:25",
                label: "25%",
                value: "25",
              },
              {
                name: "resizeImage:50",
                label: "50%",
                value: "50",
              },
              {
                name: "resizeImage:75",
                label: "75%",
                value: "75",
              },
            ],
            styles: ["alignLeft", "alignCenter", "alignRight", "block", "side"],
          },

          // Table config
          table: {
            contentToolbar: [
              "tableColumn",
              "tableRow",
              "mergeTableCells",
              "tableProperties",
              "tableCellProperties",
              "toggleTableCaption",
            ],
          },

          // Link config
          link: {
            decorators: {
              openInNewTab: {
                mode: "manual",
                label: "Open in a new tab",
                attributes: {
                  target: "_blank",
                  rel: "noopener noreferrer",
                },
              },
            },
          },

          // Code block config
          codeBlock: {
            languages: [
              { language: "css", label: "CSS" },
              { language: "html", label: "HTML" },
              { language: "javascript", label: "JavaScript" },
              { language: "php", label: "PHP" },
              { language: "python", label: "Python" },
              { language: "sql", label: "SQL" },
              { language: "xml", label: "XML" },
            ],
          },

          // List config
          list: {
            properties: {
              styles: true,
              startIndex: true,
              reversed: true,
            },
          },
        }}
        onReady={(editor) => {
          editor.plugins.get("SpecialCharacters").addItems("Emoji", [
            { title: "smiley face", character: "😀" },
            { title: "rocket", character: "🚀" },
            { title: "star", character: "⭐" },
            { title: "heart", character: "❤️" },
            { title: "thumbs up", character: "👍" },
            { title: "fire", character: "🔥" },
            { title: "party", character: "🎉" },
            { title: "check mark", character: "✅" },
            { title: "warning", character: "⚠️" },
            { title: "light bulb", character: "💡" },
            { title: "coffee", character: "☕" },
            { title: "pizza", character: "🍕" },
            { title: "cat", character: "🐱" },
            { title: "dog", character: "🐶" },
            { title: "unicorn", character: "🦄" },
            { title: "rainbow", character: "🌈" },
            { title: "sun", character: "☀️" },
            { title: "moon", character: "🌙" },
            { title: "birthday cake", character: "🎂" },
            { title: "gift", character: "🎁" },
            { title: "money", character: "💰" },
            { title: "crown", character: "👑" },
            { title: "trophy", character: "🏆" },
            { title: "medal", character: "🏅" },
          ])
        }}
        data={value}
        onChange={(event, editor) => {
          try {
            const data = editor.getData()
            onChange?.(data)
          } catch (error) {
            console.error("Editor onChange error:", error)
          }
        }}
      />
      {messError && (
        <Typography
          variant="caption"
          marginTop={1}
          marginLeft={2}
          sx={(theme) => ({
            color: theme.palette.error.main,
          })}
          onClick={(e) => {
            e.stopPropagation()
            onClick?.()
          }}
        >
          {messError}
        </Typography>
      )}
    </div>
  )
}

export default CkeditorCustom
