import * as React from "react";
type data = {
  name: any;
  parents: any;
  baseUrl: any;
  address: any;
};

const BreadCrumbs = (props: data) => {
  const [list, setList] = React.useState(null);
 var breadcrumbs;
  var data: any = [];
  React.useEffect(() => {
    setURL(props.parents, props.baseUrl);
  }, [setList]);
  const regionNames = new Intl.DisplayNames(
    ['fr'], {type: 'region'}
  );
  const setURL = (parents: any, baseUrl: any) => {
    if (parents) {
      for (let i = 0; i < parents.length; i++) {
        if (parents[i].meta.entityType.id == "ce_country") {
          parents[i].name = regionNames.of(parents[i].name);
          parents[i].slug = parents[i].slug;
          
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
          });

        } else if (parents[i].meta.entityType.id == "ce_region") {
          console.log(`${parents[i-1].slug} /${parents[i].slug}`,"hhjhjhhh")
          data.push({ name: parents[i].name, slug:`${parents[i-1].slug}/${parents[i].slug}` });
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i-1].slug}/${parents[i].slug}`;
        } else if (parents[i].meta.entityType.id == "ce_city") {
          parents[i].name = parents[i].name;
          parents[i].slug = `${parents[i - 1].slug}/${parents[i].slug}`;
          data.push({
            name: parents[i].name,
            slug: parents[i].slug,
          });
        }
      }
      breadcrumbs = data.map((crumb: any) => (
        <li key={crumb.slug}>
          <a href={baseUrl + crumb.slug + ".html"}>{crumb.name}</a>
        </li>
      ));
      setList(breadcrumbs);
    } else {
      setList(null);
    }
  };

  return (
    <div className="breadcrumb">
      <div className="container">
        <ul>
          <li>
            <a href="https://www.franceparebrise.fr/">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="19.668"
                height="18.155"
                viewBox="0 0 19.668 18.155"
              >
                <path d="M10.94,22.655V16.6h4.539v6.052h4.614V13.577h2.95L13.209,4.5,3.375,13.577h2.95v9.077Z"
                  transform="translate(-3.375 -4.5)"
                  fill="#10106a"
                />
              </svg>
            </a>
          </li>
          {list ? (
            list
          ) : (
            <>
              {props.address && props.address.city ? (
                <li>
                  {" "}
                  <a href={props.baseUrl + props.address.city }>
                    {props.address.city ? props.address.city : ""}
                  </a>
                </li>
              ) : (
                <></>
              )}
            </>
          )}
          <li>{props && props.name}</li>
        </ul>
      </div>
    </div>
  );
};
export default BreadCrumbs;
