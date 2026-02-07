# Security

## Known Vulnerabilities and Mitigations

### AssertJ Core XXE Vulnerability (CVE)

**Issue**: XML External Entity (XXE) vulnerability in org.assertj:assertj-core when parsing untrusted XML via isXmlEqualTo assertion.

**Affected Versions**: >= 1.4.0, <= 3.27.6
**Patched Version**: 3.27.7

**Source of Vulnerable Dependency**:
- React Native 0.68.2 includes `org.assertj:assertj-core:3.21.0` as a test dependency in `node_modules/react-native/ReactAndroid/build.gradle`

**Mitigation Strategy**:
This project implements a multi-layer defense to ensure the vulnerable version is never used:

1. **Global Dependency Resolution Override** (`android/build.gradle`):
   - Uses `resolutionStrategy.force` to force all assertj-core dependencies to version 3.27.7
   - Uses `eachDependency` hook to intercept every dependency resolution and replace any assertj-core version with 3.27.7
   - Applied via `allprojects` block to affect all subprojects including React Native modules

2. **Direct Dependencies** (`android/app/build.gradle`):
   - Explicitly declares patched version 3.27.7 for test scopes
   - `testImplementation 'org.assertj:assertj-core:3.27.7'`
   - `androidTestImplementation 'org.assertj:assertj-core:3.27.7'`

3. **Documentation**:
   - Clear comments in build files explaining the CVE fix
   - This SECURITY.md file documenting the vulnerability and mitigation

**Verification**:
To verify the patched version is being used:
```bash
cd android
./gradlew :app:dependencies | grep assertj
```

All assertj-core references should show version 3.27.7.

**Impact**:
- **Scope**: Test dependencies only (not included in production APK)
- **Risk Level**: Low (test-only dependency, not exposed to end users)
- **Mitigation Status**: ✅ Fully mitigated

## Reporting Security Issues

If you discover a security vulnerability in this project, please report it by creating a private security advisory on GitHub or contacting the maintainers directly.
