tell app "Reminders"
  set listNames to {}
  repeat with aList in lists
    set end of listNames to name of aList
  end repeat
  return listNames
end tell
