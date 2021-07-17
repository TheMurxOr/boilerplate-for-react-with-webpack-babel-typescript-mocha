exports.getCdnPath = function (packageName, packageVersion, packagePath) {
  if (packageName.startsWith('react')) {
    return `https://unpkg.com/${packageName}@${packageVersion}/${packagePath}`
  } else if (packageName === 'jquery') {
    // https://code.jquery.com/jquery-3.6.0.slim.min.js
    return `https://code.jquery.com/${packageName}-${packageVersion}.${packagePath}`
  }
  return ''
  //throw new Error(`CDN URL for ${packageName} not configured!`)
}
