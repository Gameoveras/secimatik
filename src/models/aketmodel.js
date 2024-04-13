import React from 'react';

export default class aketModel {
  constructor(selectedIl, selectedSex, selectedYas, selectedJob, selectedEducation, selectedIncome) {
    this.selectedIl = selectedIl;
    this.selectedSex = selectedSex;
    this.selectedYas = selectedYas;
    this.selectedJob = selectedJob;
    this.selectedEducation = selectedEducation;
    this.selectedIncome = selectedIncome;
  }

  isValid() {
    return (
      this.selectedIl !== "" &&
      this.selectedSex !== "" &&
      this.selectedYas !== "" &&
      this.selectedJob !== "" &&
      this.selectedEducation !== "" &&
      this.selectedIncome !== ""
    );
  }
}
