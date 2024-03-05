## Notes

### Backend

- I chose to manually load all rows into memory for ease of filtering. this would not be a good solution for larger log files. Either a file streaming solution or using a proper database would be a better real world approach.
- There is no auth or any kind of security measures on the API. This would be something to add if deploying code like this for real.
- I would have also liked to add pagination to the log endpoint. This was outside the scope but something that would be necessary if scaling the volume of data.

### Frontend

- I chose to use [Tanstack](https://tanstack.com/) query, table and form. This lightens the implementation boilerplate and gives a lot of great features out of the box.
- All components are client side and don't leverage SSR or much Next.js features. It would have been great to apply the [Tanstack SSR features](https://tanstack.com/query/latest/docs/framework/react/guides/ssr) to get better page loading by pre-fetching the data.
- I picked [Flowbite](https://www.flowbite-react.com/) for the UI since it has great DX out of the box to get some nice UI
