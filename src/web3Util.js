const sampleDiploma = {
  id: 'phi-giao-su',
  fullName: 'Pham Hong Phi',
  birthDay: '23/03/1997',
  date: '29/02/2018', // kk
  status: 'active',
  _type: 'degree',
  organizer: 'uit-hhh'
};

/**
 * Search diploma with correct id
 * @param id
 * @returns {Promise}
 */
let randomSearchCase = 0;
export function searchDiploma(id) {
  return new Promise( ( resolve, reject ) => {
    if ( randomSearchCase % 2 === 0 ) {
      // Dummy data
      setTimeout(() => {
        resolve(sampleDiploma);
      }, 1000);
    } else {
      reject(null);
    }
    randomSearchCase++;
  })
}