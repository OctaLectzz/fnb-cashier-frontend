export default {
  public: {
    loadingText: 'Loading...',
    requiredText: '*',
    optionalText: '(optional)',
    exampleText: 'Example : ',
    createText: 'Create',
    editText: 'Edit',
    saveText: 'Save Change',
    cancelText: 'Cancel',
    nameText: 'Name',
    descriptionText: 'Description',
    searchText: 'Search...',
    logoutText: 'Logout',
    imageType: 'JPG or PNG no larger than 5 MB',
    uploadBtn: 'Upload a new Image',
    viewsText: 'k',
    showMore: 'Show More',
    showLess: 'Show Less'
  },
  auth: {
    welcomeMsg: 'Welcome to',
    employeeWelcomeMsg: 'Employee Login',
    employeeDescriptionMsg: 'Enter your NIP and PIN',
    nameForm: 'Store Name',
    emailForm: 'Email',
    phoneNumberForm: 'Phone Number',
    ktpForm: 'KTP',
    npwpForm: 'NPWP',
    ktpPhotoForm: 'KTP Photo',
    npwpPhotoForm: 'NPWP Photo',
    passwordForm: 'Password',
    passwordConfirmationForm: 'Password Confirmation',
    currentPasswordForm: 'Current Password',
    newPasswordForm: 'New password',
    confirmNewPasswordForm: 'Confirm New Password',
    nipForm: 'NIP',
    pinForm: 'PIN',
    loginText: 'Login',
    signInText: 'Sign In',
    registerText: 'Register',
    permissionText1: 'By continuing, you agree to',
    permissionText2: 'and realize that you have read',
    termsText: 'Terms of Service',
    privacyText: 'Privacy Policy',
    noticeText: 'Notice at collection',
    successLoginMsg: 'Login successfully',
    failedLoginMsg: 'Incorrect email or password, please try again',
    successEmployeeLoginMsg: 'Employee login successfully',
    failedEmployeeLoginMsg: 'Incorrect NIP or PIN, please try again',
    expiredMsg: 'Session Expired',
    confirmLogoutText: 'Are you sure?',
    successLogoutMsg: 'Logout Successfuly',
    failedLogoutMsg: 'Logout Failed',
    validate: {
      nameRequired: 'Name must be filled in',
      nameMaxLength: 'Maximum Name is 50 characters',
      emailRequired: 'Email must be filled in',
      emailFormat: 'Invalid Email',
      emailAlready: 'Email already exists',
      passwordRequired: 'Password must be filled in',
      passwordMinLength: 'Minimum Password is 8 characters',
      passwordConfirmationRequired: 'Password Confirmation must be filled in',
      passwordConfirmationSame: 'Password Confirmation do not match',
      currentPasswordRequired: 'Current Password is required',
      currentPasswordMinLength: 'The Current Password must be a minimum of 8 characters',
      newPasswordRequired: 'New Password is required',
      newPasswordMinLength: 'The New Password must be a minimum of 8 characters',
      nipRequired: 'NIP must be filled in',
      pinRequired: 'PIN must be filled in'
    }
  },
  profile: {
    profilePictureCard: 'Profile picture',
    profileAccountInformationCard: 'Profile Account Information',
    personalDataInformationCard: 'Personal Data Information',
    changePasswordCard: 'Change Password',
    successProfileEditMsg: 'Profile edited successfully',
    failedProfileEditMsg: 'Profile editing failed, please try again later',
    successChangePasswordMsg: 'Password changed successfully',
    failedChangePasswordMsg: 'Password failed to change, please try again later'
  },
  dashboard: {
    homeMenu: 'Home',
    editProfileMenu: 'Edit Profile',
    changepasswordMenu: 'Change Password',
    fullscreenBtn: 'Toggle Fullscreen',
    fullscreenExitBtn: 'Exit Fullscreen',
    listBtn: 'List',
    gridBtn: 'Grid',
    noDataText: 'No data available.',
    warningTitle: 'WARNING!!!',
    warningText: 'Are you sure you want to delete this data?',
    actionTable: 'Action',
    menu: {
      'mainMenu': 'Main',
      'employeeMenu': 'Employee',
      'accountingMenu': 'Accounting'
    },
    main: {
      sidebar: {
        mainGroup: 'MAIN',
        managementGroup: 'MANAGEMENT',
        cashierGroup: 'CASHIER',
        companyGroup: 'COMPANY',
        homeMenu: 'Main Dashboard',
        branchMenu: 'Branches',
        categoryMenu: 'Categories',
        productMenu: 'Products',
        contactMenu: 'Contact',
        discountMenu: 'Discount',
        transactionMenu: 'Transactions',
        transactionHistoryMenu: 'Transaction Histories',
        salesReportMenu: 'Sales Reports',
        settingMenu: 'Setting',
        backMenu: 'Return to Main Menu'
      },
      home: {
        dashboardText: 'Main Dashboard',
        welcomeText: 'Welcome to',
        productCountText: 'Products',
        todayTransactionText: 'Transaction Today',
        categoryCountText: 'Categories',
        salesCard: 'Sales',
        dayFilter: 'Day',
        monthFilter: 'Month',
        totalSalesText: 'Total Sales',
        receptionText: 'Reception',
        productText: 'Products Sold',
        transactionText: 'Transaction',
        salesChartText: 'Sales Chart'
      },
      branch: {
        titleText: 'Branch',
        createText: 'Create Branch',
        editText: 'Edit Branch',
        detailCard: 'Details',
        successCreateMsg: 'Branch created successfully',
        failedCreateMsg: 'Branch failed to create, Please try again later',
        successEditMsg: 'Branch edited successfully',
        failedEditMsg: 'Branch failed to edit, Please try again later',
        successDeleteMsg: 'Branch deleted successfully',
        failedDeleteMsg: 'Branch failed to delete, please try again later',
        data: {
          branchCode: 'Branch Code',
          image: 'Branch Photo',
          name: 'Branch Name',
          detail: 'Detail',
          email: 'Email',
          phoneNumber: 'Phone Number',
          address: 'Address',
          role: 'Role',
          status: 'Status',
          statusActive: 'Active',
          statusInactive: 'Inactive'
        },
        validate: {
          nameRequired: 'Name must be filled in',
          nameMaxLength: 'Maximum Name is 255 characters',
          emailFormat: 'Invalid Email'
        }
      },
      category: {
        titleText: 'Category',
        createText: 'Create Category',
        editText: 'Edit Category',
        successCreateMsg: 'Category created successfully',
        failedCreateMsg: 'Category failed to create, Please try again later',
        successEditMsg: 'Category edited successfully',
        failedEditMsg: 'Category failed to edit, Please try again later',
        successDeleteMsg: 'Category deleted successfully',
        failedDeleteMsg: 'Category failed to delete, please try again later',
        data: {
          name: 'Name',
          slug: 'Slug',
          description: 'Description'
        },
        validate: {
          nameRequired: 'Name must be filled in',
          nameMaxLength: 'Maximum Name is 50 characters',
          nameAlready: 'Name already exists'
        }
      },
      product: {
        titleText: 'Product',
        createText: 'Create Product',
        editText: 'Edit Product',
        detailCard: 'Details',
        successCreateMsg: 'Product created successfully',
        failedCreateMsg: 'Product failed to create, Please try again later',
        successEditMsg: 'Product edited successfully',
        failedEditMsg: 'Product failed to edit, Please try again later',
        successDeleteMsg: 'Product deleted successfully',
        failedDeleteMsg: 'Product failed to delete, please try again later',
        data: {
          sku: 'SKU',
          image: 'Product Photo',
          name: 'Name',
          category: 'Category',
          price: 'Price',
          minPurchase: 'Min Purchase',
          sellingPrice: 'Selling Purchase',
          purchasePrice: 'Purchase Price',
          volume: 'Volume',
          volumeDetail: '(Length x Width x Height)',
          unit: 'Unit',
          weight: 'Weight',
          length: 'Length',
          width: 'Width',
          height: 'Height',
          status: 'Status',
          statusActive: 'Active',
          statusInactive: 'Inactive'
        },
        validate: {
          nameRequired: 'Name must be filled in',
          nameMaxLength: 'Maximum Name is 255 characters',
          categoryRequired: 'Category must be filled in',
          skuRequired: 'SKU must be filled in',
          skuMaxLength: 'Maximum SKU is 10 characters',
          skuAlready: 'SKU already exists',
          purchasePriceRequired: 'Purchase Price must be filled in',
          unitRequired: 'Unit must be filled in',
          unitMaxLength: 'Maximum Unit is 255 characters'
        }
      },
      transaction: {
        titleText: 'Transaction',
        editText: 'Edit Transaction',
        noProductText: 'Product not available.',
        checkoutBtn: 'Checkout',
        resetBtn: 'Reset',
        totalPrice: 'Total',
        detailText: 'Transaction Detail',
        detailCard: 'Details',
        paymentDetailsCard: 'Payment Details',
        noteCard: 'Note',
        printNotaBtn: 'Print Nota',
        thankYouMsg: 'Thank You :)',
        successCreateMsg: 'Transaction created successfully',
        failedCreateMsg: 'Transaction failed to create, Please try again later',
        successEditMsg: 'Transaction edited successfully',
        failedEditMsg: 'Transaction failed to edit, Please try again later',
        successDeleteMsg: 'Transaction deleted successfully',
        failedDeleteMsg: 'Transaction failed to delete, please try again later',
        data: {
          invoice: 'Invoice',
          name: 'Name',
          namePlaceholder: 'Customer 1',
          price: 'Price',
          paymentType: 'Payment Type',
          paymentTypePlaceholder: 'Select an option',
          cash: 'Cash',
          qris: 'QRIS',
          others: 'Others',
          totalPrice: 'Product Subtotal',
          discount: 'Discount',
          paymentAmount: 'Payment Amount',
          moneyAmount: 'Money Amount',
          changeAmount: 'Change Amount',
          notes: 'Notes',
          transactiondetails: 'Products',
          createdAt: 'Date'
        },
        validate: {
          nameRequired: 'Name must be filled in',
          nameMaxLength: 'Maximum Name is 255 characters',
          paymentTypeRequired: 'Payment Type must be filled in'
        }
      },
      setting: {
        titleText: 'Settings',
        photoCard: 'Photos',
        headerCard: 'Header',
        successEditMsg: 'Settings have been successfully edited',
        failedEditMsg: 'Settings failed to edit, please try again later',
        data: {
          logo: 'Logo',
          bigLogo: 'Big Logo',
          settingName: 'Name',
          description: 'Description',
          address: 'Address',
          aboutUs: 'About Us'
        },
        validate: {
          titleRequired: 'Title must be filled in',
          logoSizeRequired: 'Logo size must be filled in'
        }
      }
    },
    employee: {
      sidebar: {
        mainGroup: 'MAIN',
        managementGroup: 'MANAGEMENT',
        homeMenu: 'Employee Dashboard',
        roleMenu: 'Access Rights',
        scheduleMenu: 'Schedules',
        employeeMenu: 'Employees',
        backMenu: 'Return to Main Menu'
      },
      role: {
        titleText: 'Access Right',
        createText: 'Create Access Right',
        editText: 'Edit Access Right',
        successCreateMsg: 'Access Right created successfully',
        failedCreateMsg: 'Access Right failed to create, Please try again later',
        successEditMsg: 'Access Right edited successfully',
        failedEditMsg: 'Access Right failed to edit, Please try again later',
        successDeleteMsg: 'Access Right deleted successfully',
        failedDeleteMsg: 'Access Right failed to delete, please try again later',
        data: {
          name: 'Name',
          namePlaceholder: 'Manager',
          permissions: 'Permissions',
          permissionsPlaceholder: 'Enables/Disables all Permissions for this role',
          selectAll: 'Select All',
          viewText: 'view',
          createText: 'create',
          editText: 'edit',
          deleteText: 'delete'
        },
        validate: {
          nameRequired: 'Name must be filled in',
          nameMaxLength: 'Maximum Name is 50 characters'
        }
      },
      schedule: {
        titleText: 'Schedule',
        createText: 'Create Schedule',
        editText: 'Edit Schedule',
        successCreateMsg: 'Schedule created successfully',
        failedCreateMsg: 'Schedule failed to create, Please try again later',
        successEditMsg: 'Schedule edited successfully',
        failedEditMsg: 'Schedule failed to edit, Please try again later',
        successDeleteMsg: 'Schedule deleted successfully',
        failedDeleteMsg: 'Schedule failed to delete, please try again later',
        data: {
          name: 'Name',
          namePlaceholder: 'Morning Shift',
          startTime: 'Start Time',
          endTime: 'End Time'
        },
        validate: {
          nameRequired: 'Name must be filled in',
          nameMaxLength: 'Maximum Name is 50 characters',
          nameAlready: 'Name already exists',
          startTimeRequired: 'Start Time must be filled in',
          endTimeRequired: 'End Time must be filled in'
        }
      }
    }
  }
}
