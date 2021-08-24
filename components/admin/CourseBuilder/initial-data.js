const initialData = {
  // items: {
  //   'item-1': { id: 'item-1', content: 'Take out the bins' },
  //   'item-2': { id: 'item-2', content: 'Read the newspaper' },
  //   'item-3': { id: 'item-3', content: 'Cook dinner' },
  //   'item-4': { id: 'item-4', content: 'Fix the window' },
  //   'item-5': { id: 'item-5', content: 'Another lesson' },
  //   'item-6': { id: 'item-6', content: 'Something else to learn' },
  //   'item-7': { id: 'item-7', content: 'A quiz, maybe' },
  //   'item-8': { id: 'item-8', content: 'Something else to go here, maybe a long title for it too' },
  //   'item-9': { id: 'item-9', content: 'Short' },
  //   'item-10': { id: 'item-10', content: 'Further reading' }
  // },
  items: {
    'item-1': { id: 'item-1', content: 'Introduction' },
    'item-2': { id: 'item-2', content: 'What is a Food Allergy?' },
    'item-3': { id: 'item-3', content: 'What Foods Are People Allergic To?' },
    'item-4': { id: 'item-4', content: 'Recognising a Reaction' },
    'item-5': { id: 'item-5', content: 'Responding to a Reaction' },
    'item-6': { id: 'item-6', content: 'Living with Food Allergies' },
    'item-7': { id: 'item-7', content: 'How much did you learn?' },
    'item-8': { id: 'item-8', content: 'Further reading' }
  },
  sections: {
    'section-1': {
      id: 'section-1',
      title:'Introduction',
      itemIds: ['item-1', 'item-2', 'item-3', 'item-4']
    },
    'section-2': {
      id: 'section-2',
      title:'Symptoms & Treatment',
      itemIds: ['item-5', 'item-6', 'item-7', 'item-8']
    },
    // 'section-1': {
    //   id: 'section-1',
    //   title:'Section 1',
    //   itemIds: ['item-1', 'item-2', 'item-3', 'item-4']
    // },
    // 'section-2': {
    //   id: 'section-2',
    //   title:'Section 2',
    //   itemIds: ['item-5', 'item-6', 'item-7', 'item-8']
    // },
    // 'section-3': {
    //   id: 'section-3',
    //   title:'Section 3',
    //   itemIds: ['item-9', 'item-10']
    // },
    // 'section-4': {
    //   id: 'section-4',
    //   title:'Section 4',
    //   itemIds: []
    // },
    // 'section-5': {
    //   id: 'section-5',
    //   title:'Section 5',
    //   title:'Done',
    //   itemIds: []
    // },
    // 'section-6': {
    //   id: 'section-6',
    //   title:'Section 6',
    //   itemIds: []
    // },
    // 'section-7': {
    //   id: 'section-7',
    //   title:'Section 7',
    //   itemIds: []
    // }
  },
  //Facilitate reordering of the sections
  // sectionOrder: ['section-1','section-2','section-3','section-4','section-5','section-6','section-7'],
  sectionOrder: ['section-1','section-2'],
}

export default initialData