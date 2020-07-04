import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuBottomService } from "src/app/modules/menu/menu-bottom/menu-bottom.service";
import { DatePipe } from "@angular/common";
import { SharedModule } from "src/app/modules/shared/shared.module";
import { CookieService } from "ngx-cookie-service";
import { Router } from "@angular/router";
import { RegisterService } from "./register.service";
import { RestService } from "src/app/services/rest.service";
import { SharedService } from 'src/app/modules/shared/shared.service';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  tour: any = {};
  loading = false;
  submitted: any = [];
  register: any = {};
  directiveButton = false;
  disabledButton = false;
  @ViewChild("datePicker") datePicker: ElementRef;

  formatDatePicker = false;
  formCreditCard: boolean = true;

  auxDeparture: any = "default";
  errorMessage = "";

  /**Forms */
  formOne: FormGroup;
  formTwo: FormGroup;
  formThree: FormGroup;
  formFour: FormGroup;
  formPay: FormGroup;

  public data: any = false;
  @ViewChild("modalError") modalError: ElementRef;
  @ViewChild("travelerBirthDay") travelerBirthDay: ElementRef;
  @ViewChild("buyerBirthDay") buyerBirthDay: ElementRef;
  constructor(
    private formBuilder: FormBuilder,
    private menu: MenuBottomService,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    private shared: SharedService,
    public registerService: RegisterService,
    private rest: RestService,
    private router: Router,
    private cookies: CookieService
  ) {}

  ngOnInit(): void {
    this.formOne = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      document: ["", [Validators.required]],
      phone: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      address: ["", Validators.required],
    });
    this.formTwo = this.formBuilder.group({
      amount: ["", Validators.required],
      interes: ["", Validators.required],
      beginDay: ["", [Validators.required]],
    });
    this.formThree = this.formBuilder.group({
      jobRank: ["", Validators.required],
      addresJob: ["", Validators.required],
      section: ["", [Validators.required]],
    });
    this.begin()
  }
  begin(){
    this.registerService.loadDataFromSessionStorage()
  }

  ngAfterViewInit(): void {
    this.menu.setPosition(3)
  }
  ngAfterContentChecked(): void {
    this.cdRef.detectChanges();
  }

  get f1() {
    return this.formOne.controls;
  }
  get f2() {
    return this.formTwo.controls;
  }
  get f3() {
    return this.formThree.controls;
  }

  get f4() {
    return this.formFour.controls;
  }

  activeForms() {
    this.loading = true;
    switch (this.registerService.getActive()) {
      case 0:
        this.validateOne();
        break;
      case 1:
        // this.validateTwo();
        break;
      case 2:
        // this.validateThree();
        break;
      case 3:
        // this.validateFour();
        break;
      default:
        break;
    }
  }

  typeaheadOnBlur(event: any): void {
    this.register.country = event.item;
  }

  isInValidate(control: any, position: number) {
    return (
      (!control.pristine && control.errors) ||
      (this.submitted[position] && control.errors)
    );
  }

  validateOne() {
    this.submitted[0] = true;
    if (this.formOne.invalid) {
      this.loading = false;
      return;
    }
    this.nextStep(1, this.register);
    this.registerService.saveOne();
  }

  changeFormatDate(date) {
    return this.datePipe.transform(date, "MM-dd-yyyy");
  }

  nextStep(itemActive: number, register: any) {
    this.registerService.setRegister(register);
    this.registerService.setActive(itemActive);
    this.registerService.activeNavigation(itemActive);
  }

  changeDatapicker(value: Date, text, control) {
    let dataPickert = this.changeFormatDate(value);
    let today = this.changeFormatDate(new Date());
    if (dataPickert > today) {
      control.setValue("");
      if (text === "travelerBirthDay") {
        this.travelerBirthDay.nativeElement.value = null;
      } else {
        this.buyerBirthDay.nativeElement.value = null;
      }
      this.register[`${text}`] = "";
      this.shared.showError("GENERAL.UPS", "EDIT_PROFILE.DATE_INVALID");
    }
  }

  goToSection(number) {
    this.registerService.setActive(number);
    this.registerService.limitEnabledButton(number);
  }

  disabledPayButton() {
    this.directiveButton = true;
    this.disabledButton = true;
  }
  enabledPayButton() {
    this.directiveButton = false;
    this.disabledButton = false;
  }

}
