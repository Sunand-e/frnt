import LinkWithIcon from "./LinkWithIcon";

const DownloadLinks = ({downloads}) => {

  return (
    downloads ? (
      downloads.map((download, idx) => {
        const iconPrefix = download.sm_download_icon.class.split(" ")[0];
        const docUrl = download.sm_doc_file_attachment || download.sm_doc_url;
        return (
          <div key={idx}>
            <LinkWithIcon key={idx} href={docUrl} icon={{prefix: iconPrefix, iconName: download.sm_download_icon.value}}>
              {download.sm_doc_title}
            </LinkWithIcon>
          </div>
        )
      })
    ) : ''
  )
}

export default DownloadLinks