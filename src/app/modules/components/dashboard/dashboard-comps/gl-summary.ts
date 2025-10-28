import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AccountService } from 'src/app/modules/shared-services/account.service';

@Component({
  selector: 'app-gl-summary',
  standalone: true,
  template: `
    <div class="row">
      <!-- Cash in Hand -->
      <div class="col-md-3">
        <div class="card bg-success text-white shadow-sm">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h6 class="text-uppercase fw-semibold mb-2">Cash in Hand</h6>
              <h3 class="fw-bold mb-0">&#2547;{{ statsModel?.cashInHand }}</h3>
            </div>
            <div class="display-6 opacity-75">
              <i class="bi bi-cash-stack"></i>
            </div>
          </div>
        </div>
      </div>

      <!-- Sales Revenue -->
      <div class="col-md-3">
        <div class="card bg-primary  text-white shadow-sm">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h6 class="text-uppercase fw-semibold mb-2">Revenue</h6>
              <h3 class="fw-bold mb-0">&#2547;{{ statsModel?.salesRevenue }}</h3>
            </div>
            <div class="display-6 opacity-75">
              <i class="bi bi-cash-stack"></i>
            </div>
          </div>
        </div>
      </div>

      <!--  Total Expense  -->
      <div class="col-md-3">
        <div class="card bg-danger  text-white shadow-sm">
          <div
            class="card-body d-flex justify-content-between align-items-center"
          >
            <div>
              <h6 class="text-uppercase fw-semibold mb-2">Expense</h6>
              <h3 class="fw-bold mb-0">&#2547;{{ statsModel?.totalExpense }}</h3>
            </div>
            <div class="display-6 opacity-75">
              <i class="bi bi-cash-stack"></i>
            </div>
          </div>
        </div>
      </div>
      <!--Inventory-->
      <div class="col-md-3">
        <div class="card bg-warning text-white shadow-sm">
          <div class="card-body align-items-center">
            <div>
              <h6 class="text-uppercase fw-semibold mb-2">Inventory</h6>
              <h3 class="fw-bold mb-0">&#2547;{{ statsModel?.inventoryValue }}</h3>
            </div>
            <div class="display-6 opacity-75">
              <i class="bi bi-cash-stack"></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  imports: [CommonModule],
})
export class GlSummaryComponent implements OnInit {
  statsModel: any = {
    cashInHand: 0,
    salesRevenue: 0,
    totalExpense: 0,
    inventoryValue: 0,
  };
  constructor(private accountService:AccountService) {}
  ngOnInit(): void {
    this.fetchGlSummary()
  }

  fetchGlSummary(){
    this.accountService.getAllGlBalance().subscribe({
        next:(res:any)=>{
            if(res.body){
                this.statsModel = res.body;
            }
        }
    })
  }
}
