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
                        {
              label: 'Supply Order List',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/admin/inventory/orders'],
            },
          ],
        },
         {
          label: 'Sale',
          icon: 'pi pi-fw pi-cart-plus',
          items: [
            {
              label: 'Place Order',
              icon: 'pi pi-fw pi-plus',
              routerLink: ['/admin/sale/pos'],
            },
                        {
              label: 'Order List',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/admin/sale/orders'],
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
              label: 'Trial Balance',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/admin/report/trial-balance'],
            },
            {
              label: 'Income Statement',
              icon: 'pi pi-fw pi-list',
              routerLink: ['/admin/report/income-statement'],
            },
            
            // {
            //   label: 'Income Expense',
            //   icon: 'pi pi-fw pi-list',
            //   routerLink: ['/reports/income-expense'],
            // }
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
  
  