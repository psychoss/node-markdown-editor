 #![feature(test)]
extern crate test;
use test::Bencher;

// use std::ptr;
// use std::str;

//


// fn read_file() -> Vec<u8> {
//     "a1aa22aaa333a".as_bytes().to_vec()

// }
// fn replace(v: &mut Vec<u8>, find: u8, replace: &mut Vec<u8>) {
//     let mut count = 0;
//     let mut vec = Vec::new();

//     let pointer = v.as_ptr();
//     let mut mark_where_should_start = 0;
//     let mut never_found = true;


// loop {

//         if v[count] == find {
//             never_found = false;
//             if count - mark_where_should_start > 0 {
//                 let mut temporary = Vec::with_capacity(count - mark_where_should_start);
//                 unsafe {

//                     temporary.set_len(count - mark_where_should_start);
//                     ptr::copy_nonoverlapping(pointer.offset(mark_where_should_start as isize),
//                                              temporary.as_mut_ptr(),
//                                              temporary.len());
//                 }

//                 vec.append(&mut temporary);
//             }
//             mark_where_should_start = count + 1;

//             vec.append(&mut replace.clone());
//         }
//         count += 1;
//         if count + 1 > v.len() {
//             break;
//         }
//     }
//     if never_found {
//         println!("Nothing has been found ");
//     } else {
//         println!("{:?}", str::from_utf8(&vec));
//     }
// }

// fn main() {
//     let find = 'a' as u8;
//     let mut replace_str = "<-----replace----->".as_bytes().to_vec();

//     replace(&mut read_file(), find, &mut replace_str);
// }
// // #[test]
// // fn  test_replace() {
// // 	assert_eq!(true,replace(&mut read_file(), find, &mut replace_str););
// // }
// #[bench]
// fn bench_replace(b: &mut Bencher) {
//     let find = 'a' as u8;
//     let mut replace_str = "<-----replace----->".as_bytes().to_vec();
//     b.iter(|| {
//         replace(&mut read_file(), find, &mut replace_str);
//     });
// }

fn main() {
    let find = b'a';
    let replace_str = b"<-----replace----->";

    let result = replace(&read_file(), find, replace_str);

    println!("result: {:?}", result);
}

fn read_file() -> Vec<u8> {
    b"a1aa22aaa333a"[..].to_owned()
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

#[bench]
fn bench_replace(b: &mut Bencher) {
    let find = b'a';
    let replace_str = b"xXx";

    b.iter(|| {
        replace(&read_file(), find, replace_str);
    });
}
