import { ListPicker } from '@nativescript/core/ui/list-picker';
import { DatePicker } from '@nativescript/core/ui/date-picker';
import { Frame } from '@nativescript/core/ui/frame';
const platformModule = require('tns-core-modules/platform');

export default class Picker {
  constructor(title, options) {
    this.title = title;
    this.items = options.items || null;
    this.fields = options.fields || null;
    this.type = options.type || null;
  }

  pick() {
    const pick = new Promise(resolve => {
      const picker =
        this.type === 'date'
          ? this.createNativeDate()
          : this.createNativePicker();
      const dialog = this.createNativeDialog(picker, result => {
        resolve(result);
      });

      this.show(dialog);
    });

    return pick;
  }

  createNativeDate() {
    const width = platformModule.screen.mainScreen.widthDIPs - 16;

    const nativeView = UIDatePicker.alloc().initWithFrame(
      CGRectMake(0, 30, width, 208),
    );
    nativeView.datePickerMode = UIDatePickerMode.Date;
    const picker = new DatePicker();
    picker.date = new Date();
    picker.setNativeView(nativeView);
    picker.initNativeView();
    picker.onLoaded();

    return picker;
  }

  createNativePicker() {
    const width = platformModule.screen.mainScreen.widthDIPs - 16;

    const nativeView = UIPickerView.alloc().initWithFrame(
      CGRectMake(0, 30, width, 208),
    );
    const picker = new ListPicker();
    picker.items = this.items;
    picker.setNativeView(nativeView);
    picker.initNativeView();
    picker.onLoaded();

    return picker;
  }

  createNativeDialog(picker, callback) {
    const alertController = UIAlertController.alertControllerWithTitleMessagePreferredStyle(
      this.title,
      '\n\n\n\n\n\n\n\n\n',
      UIAlertControllerStyle.ActionSheet,
    );
    alertController.view.addSubview(picker.nativeView);

    const cancelAction = UIAlertAction.actionWithTitleStyleHandler(
      'Cancel',
      UIAlertActionStyle.Cancel,
      () => {
        callback(null);
      },
    );
    const okAction = UIAlertAction.actionWithTitleStyleHandler(
      'Select',
      UIAlertActionStyle.Default,
      () => {
        this.type === 'date'
          ? callback(picker.date)
          : callback(picker.nativeView.selectedRowInComponent(0));
      },
    );

    alertController.addAction(cancelAction);
    alertController.addAction(okAction);

    if (this.fields === 3) {
      const newAction = UIAlertAction.actionWithTitleStyleHandler(
        'Enter new person',
        UIAlertActionStyle.Default,
        () => {
          callback('new');
        },
      );
      alertController.addAction(newAction);
    }

    return alertController;
  }

  show(dialog) {
    const currentPage = Frame.topmost();
    let view = currentPage;
    let viewController = currentPage.ios.controller;

    if (currentPage.modal) {
      view = currentPage.modal;

      if (view.ios instanceof UIViewController) {
        viewController = view.ios;
      } else {
        const parentWithController = iosView.getParentWithViewController(view);
        viewController = parentWithController
          ? parentWithController.viewController
          : undefined;
      }
    }

    if (viewController) {
      if (dialog.popoverPresentationController) {
        dialog.popoverPresentationController.sourceView = viewController.view;
        dialog.popoverPresentationController.sourceRect = CGRectMake(
          viewController.view.bounds.size.width / 2.0,
          viewController.view.bounds.size.height / 2.0,
          1.0,
          1.0,
        );
        dialog.popoverPresentationController.permittedArrowDirections = 0;
      }

      if (viewController.presentedViewController) {
        viewController = viewController.presentedViewController;
      }

      viewController.presentViewControllerAnimatedCompletion(
        dialog,
        true,
        () => {},
      );
    }
  }
}
