import { useState } from "react";

const ContentLibraryView = ({ block, dragOverlay = false }) => {

  const [view, setView] = useState('grid')
  const [filter, setFilter] = useState('grid')
  
  return <p>Content Library</p>
};

export default ContentLibraryView