const DnDSingleList = ({items}) => {

  return (
    <>
      { items.map(item => (
        <li>{item}</li>
      ))}
    </>
  );
}

export default CourseStructure;