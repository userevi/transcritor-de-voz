import { EditorState, Modifier } from 'draft-js';
import { useCallback, useState } from 'react';

const useWysiwygEditor = () => {
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const insertCharacter = (characterToInsert: string, currentEditorState: EditorState) => {
    const currentContent = currentEditorState.getCurrentContent();
    const currentSelection = currentEditorState.getSelection();

    const newContent = Modifier.replaceText(
      currentContent,
      currentSelection,
      characterToInsert
    );
  
    const newEditorState = EditorState.push(currentEditorState, newContent, 'insert-characters');
  
    return  EditorState.forceSelection(newEditorState, newContent.getSelectionAfter());
  }

  const onEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };

  const insertText = (text: string) => {
    setEditorState((prevState: EditorState) => insertCharacter(text, prevState));
  }

  return {
    editorState,
    onEditorStateChange,
    insertText,
  }
}

// import dynamic from 'next/dynamic'; 
// const Editor = dynamic<any>(
//   () => import('react-draft-wysiwyg').then(mod => mod.Editor),
//   { ssr: false }
// )
// <Editor
//   editorState={editorState}
//   toolbarClassName="wysiwyg-toolbar"
//   wrapperClassName="wysiwyg-wrapper"
//   editorClassName="wysiwyg-editor"
//   onEditorStateChange={onEditorStateChange}
//   toolbar={{
//     options: [
//       "inline",
//       // "blockType",
//       // "fontSize",
//       // "fontFamily",
//       'list',
//     ],
//     inline: {
//       inDropdown: false,
//       className: undefined,
//       component: undefined,
//       dropdownClassName: undefined,
//       options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace'],
//     },
//     list: {
//       inDropdown: false,
//       className: undefined,
//       component: undefined,
//       dropdownClassName: undefined,
//       options: ['unordered', 'ordered'],
//     },
//   }}
// />

export default useWysiwygEditor