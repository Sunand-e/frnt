import { useApolloClient, useQuery, useReactiveVar, gql } from '@apollo/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { contentTagsVar } from "../../graphql/cache";
import LinkWithIcon from './LinkWithIcon';

interface TopicsListProps {
  className?: String
  onTopicClick: Function
}

export default function TopicsList({className, onTopicClick}: TopicsListProps) {
  
  const contentTags = useReactiveVar(contentTagsVar);

  return (
    <div id="topicList" className="mb-16">
      <div className="flex">
        <div className="bg-main-secondary rounded-full mr-5 h-10 w-10 flex items-center justify-center">
          <FontAwesomeIcon className="w-4 h-4 text-white" icon={{prefix: 'fas', iconName: 'list'}} />
        </div>
        <div className="flex flex-col">
        <h3 className="text-xl uppercase font-bold text-main-secondary">Choose a topic</h3>
        <span>What do you want to learn about today?</span>
        </div>
      </div>
      <div className={`grid gap-8 mt-8 grid-cols-3 ${className}`}>
        { !!contentTags.length && contentTags.map(tag => {

          const icon = tag.smTaxonomyIcon && {
            prefix: tag.smTaxonomyIcon.class.split(" ")[0], 
            iconName: tag.smTaxonomyIcon.value
          };

          return (
            <LinkWithIcon 

              onClick={onTopicClick && onTopicClick(tag)}
              key={tag.id}
              href={`library?tag=${tag.label}`}
              theme="boxed"
              icon={icon}
            >
              {`${tag.label}`}
            </LinkWithIcon>
          )
        }) }
      </div>
    </div>
  )

}
