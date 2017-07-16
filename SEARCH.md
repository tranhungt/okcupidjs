Search Pagination
=========

OKCupid allows one to search for users according to criteria. Search results come in small sizes though and to scrape lots of results, one has to iterate pages. This document describes how to use pages in the search API. 

### Overview

Paginated search results is similar to how pages are paginated in a book. Pages are ordered and describe the amount of data in each page. Pages are accessed by page hashes supplied in the query. A page hash is similar to a page number, in the sense you can easily flip to that page whenever you like. Every query returns the previous, current, and next page hash. Another page can be requested by supplying the page hash in the query. 

On a new query, one can see the current cursors by looking at the response object: 

```javascript
{
  "total_matches": ..., // some number 
  "data": [...], // results collection
  "paging" : {
    "cursors" : {
      "before" : ..., // before page hash
      "current" : ..., // current page hash
      "after" : ... // after page hash
    }
  }
}
```

To access the page "after" the current page, copy the "after" hash into another query object. 

```javascript
// query object
{
  ...
  "after": ... // put "after" hash here
}
```

### Example

The following trivial example shows how to use the cursors to print out the first 100 people satisfiying the query criteria.

```javascript
var base_query = {i_want: "women", they_want: "men" , radius: 25 };

function search(okc, query, count) {
  okc.search(query, function(err,res,body) {
    // print out usernames
    body.data.forEach(function(user) {
      console.log(user.username);
    });

    // get next page with "after" cursor
    var hash = body.paging.cursors.after;

    // check termination condtion, otherwise recurse
    if (hash != null && count <= 100) {
      // get the query with the next hash
      query.after = hash;
      // increase the count
      newCount = count + body.data.length;
      // recursively call the search function
      search(okc, query, newCount);
    }
  });
}

var OKCupid = requre('okcupidjs');
var okc = new OKCupid();

// will print out the first 100 women users who want men that are in a 25 mile radius your location
search(okc, base_query, 0);
```
