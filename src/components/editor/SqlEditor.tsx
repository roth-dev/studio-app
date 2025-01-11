"use dom";
import { useRouter } from "expo-router";
import React, { memo } from "react";
import { useWindowDimensions, View } from "react-native";
import AceEditor from "react-ace";
import "ace-builds/src-noconflict/mode-sqlserver";
import "ace-builds/src-noconflict/theme-monokai";
import "ace-builds/src-noconflict/ext-command_bar";

interface Props {
  value: string;
  onChangeText: (value: string) => void;
}
const SqlEditor = React.forwardRef<AceEditor, Props>(
  ({ onChangeText, value }: Props, ref) => {
    const { height } = useWindowDimensions();
    const router = useRouter();
    const options = {
      selectOnLineNumbers: true,
    };

    return (
      <AceEditor
        ref={ref}
        value={value}
        height={height}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
          enableSnippets: true,
          enableMobileMenu: true,
          showLineNumbers: true,
          tabSize: 2,
        }}
        editorProps={{ $blockScrolling: true }}
        mode="sqlserver"
        theme="monokai"
        name="editor-1"
        onChange={onChangeText}
        fontSize={14}
        lineHeight={19}
        showPrintMargin={true}
        showGutter={true}
        highlightActiveLine={true}
        style={{ flex: 1 }}
      />
    );
  }
);

export default memo(SqlEditor);
