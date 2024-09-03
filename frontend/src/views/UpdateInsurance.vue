<template>
    <main>
      <Navbar />
      <div class="my-5">
        <div class="mx-auto w-25 " style="max-width:100%;">
          <h2 class="text-center mb-3">Edytuj ubezpieczenie</h2>
          <form @submit.prevent="updateInsurance">
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="insuranceName" class="form-label">Nazwa</label>
                <input id="insuranceName" type="text" name="insuranceName" class="form-control" placeholder="Nazwa"
                  required v-model="insurance.insuranceName" />
              </div>
            </div>
  
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="insuranceRate" class="form-label">Cena</label>
                <input id="insuranceRate" type="number" step="0.01" name="insuranceRate" class="form-control" required
                  v-model="insurance.insuranceRate" />
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
    name: 'editInsurance',
    components: {
      Navbar
    },
  
    data() {
      return {
        insurance: {
            insuranceName: "",
            insuranceRate: "",
        }
      };
    },
    beforeMount() {
      this.getInsuranceById();
    },
    methods: {
      getInsuranceById() {
        fetch(`http://localhost:8085/api/insurance/id/${this.$route.params.id}`)
          .then(res => res.json())
          .then(data => {
            this.insurance = data;
            console.log(this.insurance);
          })
  
      },
      updateInsurance() {
        fetch(`http://localhost:8085/api/insurance/updateInsurance/${this.$route.params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.insurance)
        })
          .then(data => {
            console.log(data);
            this.$router.push('/insurance');
          })
      }
    }
  }
  
  </script>