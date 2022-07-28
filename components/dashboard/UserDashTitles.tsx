const UserDashTitles = ({title, className='', children}) => {
    return (
        <div className={className}>
            <h2 className="text-lg leading-6 font-medium text-main-secondary mb-4">{title}</h2>
            { children }
        </div>
    );
}
export default UserDashTitles
