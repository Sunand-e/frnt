import dynamic from 'next/dynamic';

const BlockEditor = dynamic( import('./BlockEditorRaw'), { ssr: false } );

export default BlockEditor