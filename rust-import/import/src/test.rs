fn main() {
    let content = r#"
"Rust Code error-index-generator"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustc_mir"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code librustdoc"
"Rust Code compiletest"
"Rust Code compiletest"
"Rust Code compiletest"
"Rust Code compiletest"
"Rust Code compiletest"
"Rust Code compiletest"
"Rust Code compiletest"
"Rust Code compiletest"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code rustbook"
"Rust Code libterm"
"Rust Code libterm"
"Rust Code libterm"
"Rust Code libterm"
"Rust Code libterm"
"Rust Code libterm"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_typeck"
"Rust Code librustc_platform_intrinsics"
"Rust Code librustc_platform_intrinsics"
"Rust Code librustc_platform_intrinsics"
"Rust Code librustc_platform_intrinsics"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libsyntax_ext"
"Rust Code libserialize"
"Rust Code libserialize"
"Rust Code libserialize"
"Rust Code libserialize"
"Rust Code libserialize"
"Rust Code librustc_llvm"
"Rust Code librustc_llvm"
"Rust Code librustc_llvm"
"Rust Code librustc_front"
"Rust Code librustc_front"
"Rust Code librustc_front"
"Rust Code librustc_front"
"Rust Code librustc_front"
"Rust Code librustc_front"
"Rust Code librustc_front"
"Rust Code librustc_driver"
"Rust Code librustc_driver"
"Rust Code librustc_driver"
"Rust Code librustc_driver"
"Rust Code librustc_driver"
"Rust Code librustc_plugin"
"Rust Code librustc_plugin"
"Rust Code librustc_plugin"
"Rust Code librustc_plugin"
"Rust Code librustc_plugin"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code libcollections"
"Rust Code librustc_privacy"
"Rust Code librustc_privacy"
"Rust Code librustc_lint"
"Rust Code librustc_lint"
"Rust Code librustc_lint"
"Rust Code librustc_lint"
"Rust Code librustc_lint"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code libstd"
"Rust Code librustc_resolve"
"Rust Code librustc_resolve"
"Rust Code librustc_resolve"
"Rust Code librustc_resolve"
"Rust Code librustc_resolve"
"Rust Code librustc_resolve"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code librustc_metadata"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code libsyntax"
"Rust Code rtstartup"
"Rust Code rtstartup"
"Rust Code librustc_unicode"
"Rust Code librustc_unicode"
"Rust Code librustc_unicode"
"Rust Code librustc_unicode"
"Rust Code driver"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"Rust Code librustc_trans"
"#;
    let mut data = String::new();
    let template = "{name:_},";
    let mut lines: Vec<&str> = content.split('\n').collect();
    lines.dedup();
    lines.sort();
    for v in lines {
        if v.len() > 0 {
            data.push_str(&template.replace("_", v));

        }
    }
    println!("{}", data);
}
