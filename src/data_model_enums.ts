export function getEnumKeyByEnumValue(myEnum: any, enumValue: any) {
    let keys = Object.keys(myEnum).filter(x => myEnum[x] == enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export enum IntFuzzLimEnumDisplay {
    'Unknown' = 0,
    'Greater Than' = 1,
    'Less Than' = 2,
}
export enum StrandEnumDisplay {
    'Unknown' = 0,
    'Plus' = 1,
    'Minus' = 2,
    'Both' = 3,
    'Both Rev' = 4,
    'Other' = 255,
}
export enum FrameEnumDisplay {
    'Not Set' = 0,
    'One' = 1,
    'Two' = 2,
    'Three' = 3,
}
export enum GeneNomenclatureStatusEnumDisplay {
    'Unknown' = 0,
    'Official' = 1,
    'Interim' = 2,
}
export enum ProtRefProcessedEnumDisplay {
    'Not Set' = 0,
    'Preprotein' = 1,
    'Mature' = 2,
    'Signal Peptide' = 3,
    'Transit Peptide' = 4,
}
export enum InferenceSupportCategoryEnumDisplay {
    'Not Set' = 0,
    'Coordinates' = 1,
    'Description' = 2,
    'Existence' = 3,
}
export enum InferenceSupportTypeEnumDisplay {
    'Not Set' = 0,
    'Similar To Sequence' = 1,
    'Similar To Aa' = 2,
    'Similar To Dna' = 3,
    'Similar To Rna' = 4,
    'Similar To Mrna' = 5,
    'Similar To Est' = 6,
    'Similar To Other Rna' = 7,
    'Profile' = 8,
    'Nucleotide Motif' = 9,
    'Protein Motif' = 10,
    'Ab Initio Prediction' = 11,
    'Alignment' = 12,
    'Other' = 255,
}
export enum ExperimentSupportTypeEnumDisplay {
    'Not Set' = 0,
    'Coordinates' = 1,
    'Description' = 2,
    'Existence' = 3,
}
export enum SeqFeatExpEvEnumDisplay {
    'Experimental' = 1,
    'Not Experimental' = 2,
}
export enum AuthorLevelEnumDisplay {
    'Primary' = 1,
    'Secondary' = 2,
}
export enum AuthorRoleEnumDisplay {
    'Compiler' = 1,
    'Editor' = 2,
    'Patent Assignee' = 3,
    'Translator' = 4,
}
export enum SeqDescPubStatusEnumDisplay {
    'Unpublished' = 1,
    'In Press' = 2,
    'Published' = 3,
    'Revised' = 4,
    'Other' = 255,
}
export enum SeqAnnotSourceEnumDisplay {
    'Genbank' = 1,
    'Embl' = 2,
    'Ddbj' = 3,
    'Pir' = 4,
    'Sp' = 5,
    'Bbone' = 6,
    'Pdb' = 7,
    'Other' = 255,
}
export enum SeqInstReprEnumDisplay {
    'Not Set' = 0,
    'Virtual' = 1,
    'Raw' = 2,
    'Seg' = 3,
    'Const' = 4,
    'Ref' = 5,
    'Consen' = 6,
    'Map' = 7,
    'Delta' = 8,
    'Other' = 255,
}
export enum SeqInstMolEnumDisplay {
    'Not Set' = 0,
    'Dna' = 1,
    'Rna' = 2,
    'Aa' = 3,
    'Na' = 4,
    'Other' = 255,
}
export enum SeqInstTopologyEnumDisplay {
    'Not Set' = 0,
    'Linear' = 1,
    'Circular' = 2,
    'Tandem' = 3,
    'Other' = 255,
}
export enum SeqInstStrandEnumDisplay {
    'Not Set' = 0,
    'Ss' = 1,
    'Ds' = 2,
    'Mixed' = 3,
    'Other' = 255,
}
export enum SeqInstDataCompressionEnumDisplay {
    'None' = 0,
    'Huffman' = 1,
}
export enum OrgModSubtypeEnumDisplay {
    'Strain' = 2,
    'Substrain' = 3,
    'Type' = 4,
    'Subtype' = 5,
    'Variety' = 6,
    'Serotype' = 7,
    'Serogroup' = 8,
    'Serovar' = 9,
    'Cultivar' = 10,
    'Pathovar' = 11,
    'Chemovar' = 12,
    'Biovar' = 13,
    'Biotype' = 14,
    'Group' = 15,
    'Subgroup' = 16,
    'Isolate' = 17,
    'Common' = 18,
    'Acronym' = 19,
    'Dosage' = 20,
    'Nat Host' = 21,
    'Sub Species' = 22,
    'Specimen Voucher' = 23,
    'Authority' = 24,
    'Forma' = 25,
    'Forma Specialis' = 26,
    'Ecotype' = 27,
    'Synonym' = 28,
    'Anamorph' = 29,
    'Teleomorph' = 30,
    'Breed' = 31,
    'Gb Acronym' = 32,
    'Gb Anamorph' = 33,
    'Gb Synonym' = 34,
    'Culture Collection' = 35,
    'Bio Material' = 36,
    'Metagenome Source' = 37,
    'Type Material' = 38,
    'Nomenclature' = 39,
    'Old Lineage' = 253,
    'Old Name' = 254,
    'Other' = 255,
}
export enum SeqDescSourceGenomeEnumDisplay {
    'Unknown' = 0,
    'Genomic' = 1,
    'Chloroplast' = 2,
    'Chromoplast' = 3,
    'Kinetoplast' = 4,
    'Mitochondrion' = 5,
    'Plastid' = 6,
    'Macronuclear' = 7,
    'Extrachrom' = 8,
    'Plasmid' = 9,
    'Transposon' = 10,
    'Insertion Seq' = 11,
    'Cyanelle' = 12,
    'Proviral' = 13,
    'Virion' = 14,
    'Nucleomorph' = 15,
    'Apicoplast' = 16,
    'Leucoplast' = 17,
    'Proplastid' = 18,
    'Endogenous Virus' = 19,
    'Hydrogenosome' = 20,
    'Chromosome' = 21,
    'Chromatophore' = 22,
    'Plasmid In Mitochondrion' = 23,
    'Plasmid In Plastid' = 24,
}
export enum SeqDescSourceOriginEnumDisplay {
    'Unknown' = 0,
    'Natural' = 1,
    'Natmut' = 2,
    'Mut' = 3,
    'Artificial' = 4,
    'Synthetic' = 5,
    'Other' = 255,
}
export enum BiomolEnumDisplay {
    'Unknown' = 0,
    'Genomic' = 1,
    'Pre Rna' = 2,
    'Mrna' = 3,
    'Rrna' = 4,
    'Trna' = 5,
    'Snrna' = 6,
    'Scrna' = 7,
    'Peptide' = 8,
    'Other Genetic' = 9,
    'Genomic Mrna' = 10,
    'Crna' = 11,
    'Snorna' = 12,
    'Transcribed Rna' = 13,
    'Ncrna' = 14,
    'Tmrna' = 15,
    'Other' = 255,
}
export enum SeqDescTechEnumDisplay {
    'Sanger Dideoxy Sequencing' = 1,
    'Tech 454' = 2,
    'Helicos' = 3,
    'Illumina' = 4,
    'Ion Torrent' = 5,
    'Pacific Biosciences' = 6,
    'Solid' = 7,
    'Other' = 255,
}
export enum SeqDescCompletenessEnumDisplay {
    'Unknown' = 0,
    'Complete' = 1,
    'Partial' = 2,
    'No Left' = 3,
    'No Right' = 4,
    'No Ends' = 5,
    'Has Left' = 6,
    'Has Right' = 7,
    'Other' = 255,
}

export enum RnaRefType {
    'Unknown' = 0,
    'Premsg' = 1,
    'Mrna' = 2,
    'Trna' = 3,
    'Rrna' = 4,
    'Snrna' = 5,
    'Scrna' = 6,
    'Snorna' = 7,
    'Ncrna' = 8,
    'Tmrna' = 9,
    'Miscrna' = 10,
    'Other' = 255,
}

export enum PubstatusEnumDisplay {
    'Received' = 1,
    'Accepted' = 2,
    'Published' = 3,
    'Revised' = 4,
    'Other' = 255,
}

export enum BioseqSetClassEnumDisplay {
    'Not Set' = 0,
    'Nuc Prot' = 1,
    'Segset' = 2,
    'Conset' = 3,
    'Parts' = 4,
    'Gibb' = 5,
    'Gi' = 6,
    'Genbank' = 7,
    'Pir' = 8,
    'Pub Set' = 9,
    'Equiv' = 10,
    'Swissprot' = 11,
    'Pdb Entry' = 12,
    'Mut Set' = 13,
    'Pop Set' = 14,
    'Phy Set' = 15,
    'Eco Set' = 16,
    'Gen Prod Set' = 17,
    'Wgs Set' = 18,
    'Named Annot' = 19,
    'Named Annot Prod' = 20,
    'Read Set' = 21,
    'Paired End Reads' = 22,
    'Small Genome Set' = 23,
    'Other' = 255,
}