import {
  Component,
  OnInit,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
} from "@angular/core";
import {
  faUser, faPhoneAlt, faNetworkWired,faAddressCard, faEnvelope,faCodeBranch, faMoneyBillAlt,faDollarSign, faCalendarAlt,faBuilding
} from "@fortawesome/free-solid-svg-icons";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MenuBottomService } from "src/app/modules/menu/menu-bottom/menu-bottom.service";
import { DatePipe } from "@angular/common";
import { RegisterService } from "./register.service";
import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { esLocale } from 'ngx-bootstrap/locale';
import { defineLocale } from 'ngx-bootstrap/chronos';

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.scss"],
})
export class RegisterComponent implements OnInit {
  activeIcon = ''
  /***icons */
  faUser = faUser;
  faPhoneAlt = faPhoneAlt;
  faAddressCard = faAddressCard;
  faEnvelope = faEnvelope;
  faMoneyBillAlt = faMoneyBillAlt;
  faDollarSign = faDollarSign;
  faBuilding = faBuilding;
  faCalendarAlt = faCalendarAlt;
  faNetworkWired = faNetworkWired;
  faCodeBranch = faCodeBranch;

  loading = false;
  submitted: any = [];
  register: any = {};
  today = new Date()
  disabledButton = false;
  @ViewChild("dp") dp: any;

  /**Forms */
  formOne: FormGroup;
  formTwo: FormGroup;
  formThree: FormGroup;
  formFour: FormGroup;

  public data: any = false;
  @ViewChild("travelerBirthDay") travelerBirthDay: ElementRef;

  constructor(
    private formBuilder: FormBuilder,
    private menu: MenuBottomService,
    private datePipe: DatePipe,
    private cdRef: ChangeDetectorRef,
    public registerService: RegisterService,
    private localeService: BsLocaleService
  ) { }

  ngOnInit(): void {
    this.formOne = this.formBuilder.group({
      name: ["", Validators.required],
      lastName: ["", Validators.required],
      document: ["", [Validators.required]],
      phone: ["", Validators.required],
      address: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
    });
    this.formTwo = this.formBuilder.group({
      amount: ["", Validators.required],
      interest: ["", Validators.required],
      beginDate: ["", [Validators.required]],
      range: ["", Validators.required],
      addressJob: ["", Validators.required],
      sectional: ["", Validators.required],
    });
    this.formThree = this.formBuilder.group({
      jobRank: ["", Validators.required],
      addresJob: ["", Validators.required],
      section: ["", [Validators.required]],
    });
    this.begin()
  }
  
  begin() {
    this.register = this.registerService.getregister()
  }
  
  ngAfterViewInit(): void {
    this.menu.setPosition(3)
    defineLocale('es', esLocale);
    this.localeService.use('es');
    // this.dp.hide();
    // this.dp.show();
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

  validateForms(form: FormGroup) {
    const active = this.registerService.getActive()
    this.submitted[active] = true;
    if (form.invalid) {
      this.loading = false;
      return;
    }
    this.nextStep(active + 1, this.register);
  }

  isInValidate(control: any, position: number) {
    return (
      (!control.pristine && control.errors) ||
      (this.submitted[position] && control.errors)
    )
  }

  nextStep(itemActive: number, register: any) {
    this.registerService.setRegister(register);
    this.registerService.setActive(itemActive);
    this.registerService.activeNavigation(itemActive);
    this.registerService.setStorage(this.register)
  }

  goToSection(number) {
    this.registerService.setActive(number);
  }

  changeDatapicker(event) {
    console.log(event)
  }

  cleanIcon() {
    this.activeIcon = '';
  }

  checkIcon = (key) => this.activeIcon === key;
}
