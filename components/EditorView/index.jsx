import React, { useEffect, useRef } from "react";

function EditorView({ editorLoaded, name, value, height }) {
    const editorRef = useRef();
    const { CKEditor, ClassicEditor } = editorRef.current || {};

    useEffect(() => {
        editorRef.current = {
            CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, // v3+
            ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
        };
    }, []);

    return (
        <div>
            {editorLoaded ? (
                <CKEditor
                    config={{
                        toolbar: [],
                        removePlugins: [
                            "Heading",
                            "bold",
                            "italic",
                            "bulletedList",
                            "|",
                            "numberedList",
                            "alignment",
                        ],
                        isReadOnly: true,
                    }}
                    name={name}
                    editor={ClassicEditor}
                    disabled
                    data={value}
                    onReady={(editor) => {
                        editor.editing.view.change((writer) => {
                            writer.setStyle(
                                "min-height",
                                height || "200px",
                                editor.editing.view.document.getRoot()
                            );
                        });
                    }}
                />
            ) : (
                <div>Editor loading</div>
            )}
        </div>
    );
}

export default EditorView;
