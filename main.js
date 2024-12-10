// Returns a random DNA base
const returnRandBase = () => {
    const dnaBases = ['A', 'T', 'C', 'G']
    return dnaBases[Math.floor(Math.random() * 4)]
};
//console.log(returnRandBase())
// Returns a random single strand of DNA containing 15 bases
const mockUpStrand = () => {
    const newStrand = []
    for (let i = 0; i < 15; i++) {
        newStrand.push(returnRandBase())
    }
    return newStrand
}
//console.log(mockUpStrand());

const pAequorFactory = (specimenNum, dna) => {
    return {
        specimenNum: specimenNum, // Unique identifier for the organism
        dna: dna,  // Array of 15 DNA bases

        // Method to mutate a random base in the DNA
        mutate() {
            //randomly select an index in the dna
            const randomIndex = Math.floor(Math.random() * this.dna.length);
            const currentBase = this.dna[randomIndex];
            //generate a base that is different than current base
            let newBase;
            do {
                newBase = returnRandBase();
            } while (newBase === currentBase); // ensures new base is different
            //replace current base with new base
            this.dna[randomIndex] = newBase;
            //return the mutated dna
            return this.dna;
        },
        // Method to compare DNA with another pAequor object
        compareDNA(otherPAequor) {
            let identicalBases = 0;
            for (let i = 0; i < this.dna.length; i++) {
                if (this.dna[i] === otherPAequor.dna[i]) {
                    identicalBases++;
                }
            }
            //calculate the percent of identical bases
            const percentage = ((identicalBases / this.dna.length) * 100).toFixed(2);
            console.log(`Speciment #${this.specimenNum} and Speciment # ${otherPAequor.specimenNum} have ${percentage}% DNA in common.`);
            //return percentage
        
    },
        willLikelySurvive() {
        // Count 'C' and 'G' bases in the DNA
        const survivalBases = this.dna.filter(base => base === 'C' || 'G').length;
        //calculate percent of C and G
        const percentage = (survivalBases / this.dna.length) * 100;
        //return true if percent is >60
        return percentage >= 60;
    }
};
};

//generate 30 instances of pAequor that can crvive

const survivingAPequor = [];
let specimenNum = 1;
while (survivingAPequor.length < 30) {
    const newDNA = mockUpStrand();
    newPAequor = pAequorFactory(specimenNum, newDNA);

    if (newPAequor.willLikelySurvive()) {
        survivingAPequor.push(newPAequor);
    }
    specimenNum++;
}
console.log(JSON.stringify(survivingAPequor));


//console.log(mockUpStrand());
//const newDNA = mockUpStrand();
//const newOrganism = pAequorFactory(1, newDNA);
//console.log(newOrganism.dna);
//console.log("DNA of specimen #1:", pAequor1.dna);
