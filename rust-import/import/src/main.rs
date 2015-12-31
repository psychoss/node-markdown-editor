
extern crate rusqlite;
extern crate time;
use rusqlite::Connection;
use rusqlite::types::Null;
use std::fs::{self, DirEntry, File};
use std::io::prelude::*;
use std::io;
use std::mem;
use std::path::{Path, PathBuf};
use std::ptr;
use std::slice;
use std::str;
use time::Timespec;

const DIR: &'static str = "/home/psycho/Downloads/ACHIEVE/ACHIEVE/q";

fn main() {
    let db = "/home/psycho/RESOURCE/归档/web/static/database/1.db";
    let path = Path::new(DIR);
    let conn = Connection::open(db).unwrap();
    visit_dirs(&path, &do_file, &conn);
}

// macro for convert str to Vec
macro_rules! str_to_vec {
    ($e:expr) => (
       $e.as_bytes().to_vec()
    );
}



// get filename without extension
fn get_file_name(path: &Path) -> Vec<u8> {
    path.file_stem().unwrap().to_str().unwrap().as_bytes().to_vec()
}

// trim fixed length
fn vec_trim<T: Clone>(buffer: &[T], len: usize) -> Option<Vec<T>> {
    if buffer.len() < len {
        return None;
    }
    let x: &[T] = unsafe {
        slice::from_raw_parts(buffer.as_ptr().offset(len as isize), buffer.len() - len)
    };
    Some(x.to_vec())
}

// casting vec to String
fn vec_to_str(buffer: &[u8]) -> String {
    unsafe {
        let x: &str = mem::transmute(buffer);
        x.to_string()
    }
}

fn do_file(entry: &DirEntry, con: &Connection) {
    let p = &entry.path();
    match p.extension() {
        Some(v) => {
            if v.to_str().unwrap() != "rs" {
                return;
            }
        }
        None => {
            return;
        }
    }


    let remove = str_to_vec!(DIR);
    
    let category = vec_trim(&p.to_str().unwrap().as_bytes(), remove.len()).unwrap();
    let mut category_vec="Rust Code ".to_string();
    for group in category.split(|num| *num ==47){
        if group.len()>0{
            category_vec.push_str(&vec_to_str(group));
            break;
        }
    }
    

    // Content
    let mut content = b"# "[..].to_owned();
    // filename without extension
    let mut file_name = get_file_name(p);
    content.append(&mut file_name.clone());
    let mut pre_mark = b"\n```\n"[..].to_owned();
    content.append(&mut pre_mark.clone());
    let mut file_content = read_file(p).unwrap();
    let mut file_content_processed = replace(&file_content, '`' as u8, &b"&#96;"[..]);
    content.append(&mut file_content_processed);
    let ttt = "1451462388122".to_string();
    content.append(&mut pre_mark.clone());
    println!("{:?}",category_vec);
    
  
    let x = con.execute("INSERT OR REPLACE  INTO markdown VALUES ($1, $2, $3, $4, $5, $6)",
                        &[&Null,
                          &vec_to_str(&file_name.clone()),
                          &category_vec,
                          &String::from_utf8(content).unwrap(),
                          &ttt,
                          &ttt])
               .unwrap();
    println!("{:?}", x);
}
fn read_file(path: &PathBuf) -> io::Result<Vec<u8>> {
    let mut file = try!(File::open(path));
    let mut v = Vec::new();
    try!(file.read_to_end(&mut v));
    // "1451462388122"
    Ok(v)
}
// one possible implementation of fs::walk_dir only visiting files
fn visit_dirs(dir: &Path, cb: &Fn(&DirEntry, &Connection), con: &Connection) -> io::Result<()> {
    if try!(fs::metadata(dir)).is_dir() {
        for entry in try!(fs::read_dir(dir)) {
            let entry = try!(entry);
            if try!(fs::metadata(entry.path())).is_dir() {
                try!(visit_dirs(&entry.path(), cb, con));
            } else {

                cb(&entry, con);
                // break;
            }
        }
    }
    Ok(())
}

fn replace(search: &[u8], find: u8, replace: &[u8]) -> Vec<u8> {
    let mut result = vec![];
    for &b in search {
        if b == find {
            result.extend(replace);
        } else {
            result.push(b);
        }
    }
    result
}
