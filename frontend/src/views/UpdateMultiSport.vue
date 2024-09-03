<template>
    <main>
      <Navbar />
      <div class="my-5">
        <div class="mx-auto w-25 " style="max-width:100%;">
          <h2 class="text-center mb-3">Edytuj MultiSport</h2>
          <form @submit.prevent="updateMultiSport">
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="insuranceName" class="form-label">Nazwa</label>
                <input id="insuranceName" type="text" name="insuranceName" class="form-control" placeholder="Nazwa"
                  required v-model="multisport.packageName" />
              </div>
            </div>
  
            <div class="row">
              <div class="col-md-12 form-group mb-3">
                <label for="insuranceRate" class="form-label">Cena</label>
                <input id="insuranceRate" type="number" step="0.01" name="insuranceRate" class="form-control" required
                  v-model="multisport.packageValue" />
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
  </template>
  
  
  <script>
  import Navbar from '../components/Navbar.vue';
  
  export default {
    name: 'editMultiSport',
    components: {
      Navbar
    },
  
    data() {
      return {
        multisport: {
            packageName: "",
            packageValue: "",
        }
      };
    },
    beforeMount() {
      this.getMultiSportById();
    },
    methods: {
      getMultiSportById() {
        fetch(`http://localhost:8085/api/multisport/id/${this.$route.params.id}`)
          .then(res => res.json())
          .then(data => {
            this.multisport = data;
            console.log(this.multisport);
          })
  
      },
      updateMultiSport() {
        fetch(`http://localhost:8085/api/multisport/updateMultiSport/${this.$route.params.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.multisport)
        })
          .then(data => {
            console.log(data);
            this.$router.push('/multisport');
          })
      }
    }
  }
  
  </script>