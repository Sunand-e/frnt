import Head from 'next/head'
import { useReactiveVar } from '@apollo/client';
import PageContent from '../components/PageContent.js';
import PageTitle from '../components/PageTitle.js';
import { useState, useEffect } from 'react';
import LoadingSpinner from '../components/LoadingSpinner.js';
import ItemFilterTabs from '../components/ItemFilterTabs.js';
import { allContentVar } from '../graphql/cache.js';

export default function Resources({queries}) {

  const items = useReactiveVar(allContentVar);

  const [ resources, setResources ] = useState([])

  useEffect(() => {
    setResources(items.filter(item => item.__typename === 'Resource'))
  },[items])

  useEffect(() => {
    queries.getAllContent()
  },[])

  const tabs = [
    {
      name: 'all',
      title: 'View All',
      filter: items => items
    },
    {
      name: 'offers',
      title: 'Offers & Discounts',
      filter: items => items.filter(item => item.resourceTags.length)
    },
    {
      name: 'tools',
      title: 'Plugins & Tools',
      filter: items => items.filter(item => item.resourceTags.length)
    },
    {
      name: 'other',
      title: 'Other Resources',
      filter: items => items.filter(item => item.resourceTags.length)
    }
  ]
  
  return (
    <>
      <Head>
        <title>Membership Academy</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <PageTitle
        title='Resources'
        subtitle="More resources we have to give to you which are worth checking out!"
      />
      <PageContent>
        { !resources.length ? 
          <LoadingSpinner /> :
          <ItemFilterTabs 
            items={resources}
            options={
              {
                itemOptions: {
                  showExcerpt: true,
                  showButton: true
                }
              }
            }
            tabs={tabs}
          />
        }
      </PageContent>
    </>
  )
}
