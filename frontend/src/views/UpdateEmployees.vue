<template>
  <main>
    <Navbar />
    <div class="my-5">
      <div class="mx-auto w-25 " style="max-width:100%;">
        <h2 class="text-center mb-3">Edytuj pracownika</h2>
        <form @submit.prevent="updateEmployee">
          <div class="row">
            <div class="col-md-12 form-group mb-3">
              <label for="fullName" class="form-label">Imię i nazwisko</label>
              <input id="fullName" type="text" name="fullName" class="form-control" placeholder="Imię i Nazwisko"
                required v-model="employee.fullName" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group mb-3">
              <label for="lastMedicalExamDate" class="form-label">Ostatnie badanie lekarskie</label>
              <input id="lastMedicalExamDate" type="date" name="lastMedicalExamDate" class="form-control" required
                v-model="employee.lastMedicalExamDate" />
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group mb-3">
              <label for="bhpExamDate" class="form-label">Data badania BHP</label>
              <input id="bhpExamDate" type="date" name="bhpExamDate" class="form-control" required
                v-model="employee.bhpExamDate" />
            </div>
          </div>

          <label for="ppk" class="form-label">Czy należy do PPK</label>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ppk" id="true" value="true" v-model="employee.ppk" />
            <label class="form-check-label" for="male">Tak</label>
          </div>
          <div class="form-check">
            <input class="form-check-input" type="radio" name="ppk" id="false" value="false" v-model="employee.ppk" />
            <label class="form-check-label" for="female">Nie</label>
          </div>

          <div class="row">
            <div class="col-md-12 form-group mb-3">
              <label for="insurance" class="form-label">Ubezpieczenie grupowe</label>
              <select id="insurance" class="form-control" v-model="employee.insurance">
                <option :key="null" :value="null"> Brak </option>
                <option v-for="insurance in insurances" :key="insurance.id" :value="insurance">
                  {{ insurance.insuranceName }} - Stawka:
                  {{ insurance.insuranceRate }}
                </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group mb-3">
              <label for="multisport" class="form-label">MultiSport</label>
              <select id="multisport" class="form-control" v-model="employee.multisport">
                <option :key="null" :value="null"> Brak </option>
                <option v-for="multisport in multisports" :key="multisport.id" :value="multisport">
                  {{ multisport.packageName }} - Stawka:
                  {{ multisport.packageValue }}
                </option>
              </select>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group mb-3">
              <label for="remark" class="form-label">Uwagi</label>
              <textarea id="remark" type="text" name="remark" class="form-control" placeholder="Uwagi"
                v-model="employee.remarks" rows="4" wrap="soft"></textarea>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12 form-group">
              <input class="btn btn-primary w-100" type="submit" value="Edytuj" />
            </div>
          </div>

          <div></div>
        </form>

      </div>
    </div>

  </main>

  <footer class="mt-auto">
    <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.05);">
      © 2024 Copyright:
      <a class="text-body" href="https://www.ambsoft.pl/">amb software IT</a>
    </div>
  </footer>
</template>


<script>
import Navbar from '../components/Navbar.vue';

export default {
  name: 'UpdateEmployee',
  components: {
    Navbar
  },

  data() {
    return {
      employee: {
        fullName: "",
        lastMedicalExamDate: "",
        bhpExamDate: "",
        ppk: "",
        insurance: null,
        multisport: null,
        remarks: "",
      },
      insurances: [],
      multisports: [],
    };
  },
  beforeMount() {
    this.getAllInsurance();
    this.getAllMultiSports();
    this.getEmployeeById();
  },
  methods: {
    getAllInsurance() {
      fetch("http://localhost:8085/api/insurance")
        .then((res) => res.json())
        .then((data) => {
          this.insurances = data;
          console.log(data);
        });
    },
    getAllMultiSports() {
      fetch("http://localhost:8085/api/multisport")
        .then((res) => res.json())
        .then((data) => {
          this.multisports = data;
          console.log(data);
        });
    },
    getEmployeeById() {
      fetch(`http://localhost:8085/api/employee/id/${this.$route.params.id}`)
        .then(res => res.json())
        .then(data => {
          this.employee = data;
          console.log(this.employee);
        })

    },
    updateEmployee() {
      fetch(`http://localhost:8085/api/employee/updateEmployee/${this.$route.params.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.employee)
      })
        .then(data => {
          console.log(data);
          this.$router.push('/');
        })
    }
  }
}

</script>