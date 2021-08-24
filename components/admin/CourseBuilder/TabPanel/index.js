import { TabPanel as WPTabPanel } from '@wordpress/components';
 
const onSelect = ( tabName ) => {
    console.log( 'Selecting tab', tabName );
};

const TabPanel = ({className, children}) => {

    console.log(children);
    // console.error('BOOOOOOOOOO');
    const tabs = React.Children.map(children, el => (
        {
            name: el.props.name,
            title: el.props.tabTitle,
            className: 'tab-' + el.props.name,
            el
        }
    ));

    const activeTab = children[0];

    return (
        <WPTabPanel
        className={className}
        activeClass="active-tab"
        onSelect={ onSelect }
        tabs={ tabs }>
            {
                (tab) => (
                    tab.el
                )
            }
        </WPTabPanel>
    );
}

export default TabPanel;