## SBX Native App

# Running locally
- Open ios folder in Xcode and run

# Running on device
- Change localhost to IP in appdelegate.m

# Building on device
- Comment out first jsCodeLocation declaration in appdelegate.m and uncomment second declaration
- Set Dead Code Stripping to no on all targets in Xcode
- Set Build Configuration to debug (Product -> Scheme -> Edit Scheme)

# Troubleshooting
- command alt shift K to reset xcode build history
- react-native upgrade to reset project ( this resets appdelegate.m )
