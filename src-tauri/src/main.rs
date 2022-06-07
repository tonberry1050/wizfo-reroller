#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod win_command;

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![
            focus_window_handler,
            enter_key_handler,
            combination_key_handler,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}

#[tauri::command]
fn focus_window_handler(window_name: String) {
    println!("requested 'focus_window' for '{}'", window_name);
    unsafe {
        win_command::focus_window(window_name);
    }
    print!("focused");
}

/**
 * press the key and release it
 * 
 * please see virtual-key code of windows
 * https://docs.microsoft.com/en-us/windows/win32/inputdev/virtual-key-codes
 */
#[tauri::command]
fn enter_key_handler(key_code: usize) {
    println!("requested 'key_enter' for '{}'", key_code);
    unsafe {
        win_command::key_enter(u16::try_from(key_code).unwrap());
    }
    print!("entered {}", key_code);
}

/**
 * press all key from array start then release them from array end
 */
#[tauri::command]
fn combination_key_handler(key_codes: Vec<usize>) {
    for key_code in key_codes.iter() {
        println!("press '{}'", key_code);
        unsafe {
            win_command::key_enter(u16::try_from(*key_code).unwrap());
        }
    };
    for key_code in key_codes.iter().rev() {
        println!("release '{}'", key_code);
        unsafe {
            win_command::key_enter(u16::try_from(*key_code).unwrap());
        }
    };

}