
## Activity - Diamond Knight Scanning
```javascript
class ScannerSuperClass {
  constructor(model, height, width, color, dpi, outputFormat) {
    this.model = model;
    this.height = height;
    this.width = width;
    this.color = color;
    this.dpi = dpi;
    this.outputFormat = outputFormat;
  }
  get color() {
    return this.color;
  }
  get dpi() {
    return this.dpi;
  }
  get outputFormat() {
    return this.outputFormat;
  }
  scanDocuments(model, outputformat, dpi, width, height, color) {
    console.log('scanDocuments');
    return {model, outputformat, dpi, width, height, color}
  }
  deleteScannedDocument(scannedImages) {
    console.log('deleteScannedDocuments');
    return {scannedImages}
  }
  getScannedDocuments(imageLocation) {
    console.log('getScannedDocuments');
    return {imageLocation}
  }
}
```