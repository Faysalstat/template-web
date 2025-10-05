export const MENUITEM = [
    {
      label: 'Home',
      items: [
        { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
      ],
    },
    {
      label: 'Modules',
      items: [
        {
          label: 'Product',
          icon: 'pi pi-fw pi-cart-plus',
          items: [
            {
              label: 'Product List',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/admin/product/list'],
            },
            {
              label: 'Add Product',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['/admin/product/add'],
            },
          ],
        },
        {
          label: 'Inventory',
          icon: 'pi pi-fw pi-cart-plus',
          items: [
            {
              label: 'Add Stock',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['/admin/inventory/add-stock'],
            },
          ],
        },
        {
          label: 'Configs',
          icon: 'pi pi-fw pi-truck',
          items: [
            {
              label: 'Manage Configs',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/admin/config'],
            },
          ],
        },
        {
          label: 'Reports',
          icon: 'pi pi-fw pi-users',
          items: [
            {
              label: 'Product Report',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/comunity/add'],
            },
            {
              label: 'Transactions',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/comunity/list'],
            }
          ],
        }
      ],
    },
    {
      label: 'Need Help?',
      items: [
        {
          label: 'FAQ',
          icon: 'pi pi-fw pi-question',
          routerLink: ['/documentation'],
        },
        {
          label: 'Tutorials',
          icon: 'pi pi-fw pi-sitemap',
          routerLink: ['/documentation'],
        },
      ],
    },
  ];
  
  