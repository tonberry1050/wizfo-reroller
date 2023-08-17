use winapi::{
    um::winuser::{GetWindowTextW, SendInput, INPUT, INPUT_KEYBOARD,
                  KEYEVENTF_KEYUP, SetForegroundWindow, SetFocus, EnumWindows},
    shared::{
        windef::{HWND},
        minwindef::{LPARAM, BOOL, TRUE, FALSE}
    },
};
use std::char::{decode_utf16, REPLACEMENT_CHARACTER};
use std::mem;

struct WinMem {
    window_name: String,
}

pub unsafe fn focus_window (window_name: String) -> BOOL {
    // focus wiz window
    let win_mem = WinMem { window_name: window_name.into() };
    EnumWindows(Some(enum_proc), (&win_mem as *const WinMem) as LPARAM)
}

pub unsafe fn key_enter(key_code: u16) {
    key_down(key_code);
    key_up(key_code);
}

pub unsafe fn key_down(key_code: u16) {
    let mut input = create_input(key_code, 0);
    SendInput(1, &mut input, mem::size_of::<INPUT>() as i32);
}

pub unsafe fn key_up(key_code: u16) {
    let mut input = create_input(key_code, KEYEVENTF_KEYUP);
    SendInput(1, &mut input, mem::size_of::<INPUT>() as i32);
}

unsafe fn create_input(key_code: u16, flags: u32) -> INPUT {
    let mut input = mem::zeroed::<INPUT>();
    input.type_ = INPUT_KEYBOARD;
    let ki = input.u.ki_mut();
    ki.wVk = key_code;
    ki.dwFlags = flags;
    input
}

fn decode(source: &[u16]) -> String {
    decode_utf16(source.iter().take_while(|&i| *i != 0).cloned())
        .map(|r| r.unwrap_or(REPLACEMENT_CHARACTER))
        .collect()
}

unsafe extern "system" fn enum_proc(hwnd: HWND, l_param: LPARAM) -> BOOL {
    let mut buf = [0u16; 1024];
    if GetWindowTextW(hwnd, &mut buf[0], 1024) > 0 {
        let win_text = decode(&buf);
        let win_mem = &*(l_param as *const WinMem) as &WinMem;
        if win_mem.window_name == win_text {
            SetForegroundWindow(hwnd);
            SetFocus(hwnd);
            return FALSE;
        }
    }
    TRUE
}
