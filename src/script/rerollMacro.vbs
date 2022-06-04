' 引数を要求
if WScript.Arguments.Count <> 5 then
    WScript.echo("please input 5 args")
    WScript.Quit(-1)
end if
characterName = WScript.Arguments(0)
characterJob = WScript.Arguments(1)
characterRace = WScript.Arguments(2)
characterAliment = WScript.Arguments(3)
characterSex = WScript.Arguments(4)

Sub inputKey( key )
    WshShell.SendKeys key
    WScript.Sleep 400
End Sub

set WshShell = WScript.CreateObject("WScript.Shell")

WshShell.AppActivate "WizardryFoV2"
inputKey("^{F1}")
inputKey("~")
inputKey("e")
inputKey("t")
inputKey("m")
' name
inputKey(characterName)
inputKey("~")
inputKey("~")
' job
inputKey(characterJob)
' race
inputKey(characterRace)
' aliment
inputKey(characterAliment)
' sex
inputKey(characterSex)

WScript.Quit(0)