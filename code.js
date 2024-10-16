var columns = {
  'date': 1,
  'time': 2,
  'platform': 3,
  'jobLink': 4,
  'jobTitle': 5,
  'company': 6,
  'resume': 7,
  'coverLetter': 8,
  'comment': 9,
  'responce': 10,
}

function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('Application Tracker')
    .addItem('Create Header Row', 'createHeaderRow')
    .addItem('Open Tracker Form', 'showApplicationForm')
    .addToUi();
}

// Function to create the custom UI sidebar
function showApplicationForm() {
  var html = HtmlService.createHtmlOutputFromFile('Form')
      .setTitle('Job Application Tracker')
      .setWidth(400);
  SpreadsheetApp.getUi().showSidebar(html);
}

// Function to handle form submission
function submitApplication(data) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Mandatory fields check
  var mandatoryFields = ['jobTitle', 'company', 'platform'];
  for (var i = 0; i < mandatoryFields.length; i++) {
    if (!data[mandatoryFields[i]]) {
      return 'Please fill in all mandatory fields.';
    }
  }
  
  // Insert a new row at the top (second row, because the first row might be headers)
  sheet.insertRowBefore(2);
  
  // Set the values from the form into the new top row
  var now = new Date();
  sheet.getRange(2, columns.date).setValue(now); // Date column
  sheet.getRange(2, columns.time).setValue(now.toTimeString().split(' ')[0]); // Time column
  sheet.getRange(2, columns.platform).setValue(data.platform); // Platform column
  sheet.getRange(2, columns.jobLink).setValue(data.jobLink); // Job Link Column
  sheet.getRange(2, columns.jobTitle).setValue(data.jobTitle); // Job Title column
  sheet.getRange(2, columns.company).setValue(data.company); // Company column
  sheet.getRange(2, columns.resume).setValue(data.resume); // Resume column
  sheet.getRange(2, columns.coverLetter).setValue(data.coverLetter); // Cover Letter column
  sheet.getRange(2, columns.comment).setValue(data.comment); // Comment Column
  
  // Show a success message
  return 'Application Submitted Successfully!';
}


// Function to get unique values for dropdowns and convert to strings
function getDropdownOptions() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var lastRow = sheet.getLastRow();
  var platformCol = sheet.getRange(2, columns.platform, lastRow - 1).getValues().flat();
  var resumeCol = sheet.getRange(2, columns.resume, lastRow - 1).getValues().flat();

  // Convert each value to string and get unique values
  var uniquePlatforms = Array.from(new Set(platformCol)).map(String);
  var uniqueResumes = Array.from(new Set(resumeCol)).map(String);
  
  return {
    platforms: uniquePlatforms,
    resumes: uniqueResumes,
  };
}

// Function to create a header row with bold, center-aligned text
function createHeaderRow() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  
  // Insert a row at the top of the sheet
  sheet.insertRowBefore(1);
  
  // Define the header values
  var headers = ['Date', 'Time', 'Platform', 'Job Link', 'Job Title', 'Company', 'Resume', 'Cover Letter', 'Comment', 'Responce'];

  // Set the headers in the first row
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  
  // Apply formatting: Bold and Center Alignment
  var headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold'); // Set bold text
  headerRange.setHorizontalAlignment('center'); // Set center alignment
}
