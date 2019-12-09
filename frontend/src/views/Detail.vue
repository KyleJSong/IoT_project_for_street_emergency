<template>
  <section id="two" class="wrapper style2 alt">
    <div class="inner split">
      <section>
        <h1 id="currentList">현재 상황</h1>
        <hr>
        <div class="table-wrapper">
          <table>
            <th>force</th>
            <th>gyro</th>
            <th>time</th>
            <th>coordinates of Paramedic</th>
            <br>
            <tr class ="tableContents" v-for ="emergency_detail in emergency_details" :key ="emergency_detail.idx">
              <td>{{ emergency_detail.force }}</td>
              <td>{{ emergency_detail.gyro }}</td>
              <td>{{ subDate(emergency_detail.time) }}</td>
              <td>({{ emergency_detail.x_coordinate_of_paramedic }} , {{ emergency_detail.y_coordinate_of_paramedic }})</td>
              <!--<hr style ="color : #E0E3DA; border : 1.2px dotted;"/>-->
            </tr>
          </table>
        </div>
      </section>
      <section>
        <ul class="googleMap">
          googlemap here
        </ul>
      </section>
    </div>
  </section>

</template>

<script>
    import axios from 'axios';
    export default {
        data (){
            return{
                emergency_details : [],
                data : {}
            }
        },
        methods: {
            subDate(date){
                var subDate = date.substring(0,22);
                var pardsedDate = subDate.split('T');
                return pardsedDate[0] + " " + pardsedDate[1];
            },
            pollData () {
                this.emergency_details = setInterval(() => {
                    newValue = axios.get("https://52mpnxgee9.execute-api.us-east-2.amazonaws.com/default/iot_project");
                    newArray = [newValue].concat(this.emergency_details);
                    console.log(newValue);
                }, 400)
            }

        },
        async beforeCreate() {

            var id = this.$route.params.id;
            /*this.data = await axios.get("/api/detail/search/" + id);*/
            const emergency_details_result = await axios.get("/api/detail/" + id);
            /*const emergency_details_result = await axios.get("https://52mpnxgee9.execute-api.us-east-2.amazonaws.com/default/iot_project"); */
            this.emergency_details = emergency_details_result['body'];

        },
        mounted () {
            console.log("mounted");
            this.pollData()
        }

    }
</script>

<style>
  html, body, div, span, applet, object, iframe, h1, h2, h3, h4, h5, h6, p, blockquote, pre, a, abbr, acronym, address, big, cite, code, del, dfn, em, img, ins, kbd, q, s, samp, small, strike, strong, sub, sup, tt, var, b, u, i, center, dl, dt, dd, ol, ul, li, fieldset, form, label, legend, table, caption, tbody, tfoot, thead, tr, th, td, article, aside, canvas, details, embed, figure, figcaption, footer, header, hgroup, menu, nav, output, ruby, section, summary, time, mark, audio, video {
    margin: 0;
    padding: 0;
    border: 0;
    font-size: 100%;
    font: inherit;
    vertical-align: baseline;
  }

  ol, ul {
    list-style: none;
  }

  /* Table */

  .table-wrapper {
    -webkit-overflow-scrolling: touch;
    overflow-x: auto;
  }

  table {
    margin: 0 0 2em 0;
    width: 100%;
  }

  table tbody tr {
    border: solid 1px;
    border-left: 0;
    border-right: 0;
  }

  table td {
    padding: 0.75em 0.75em;
  }

  table th {
    font-size: 0.9em;
    font-weight: bold;
    padding: 0 0.75em 0.75em 0.75em;
    text-align: left;
  }

  table thead {
    border-bottom: solid 2px;
  }

  table tfoot {
    border-top: solid 2px;
  }

  table.alt {
    border-collapse: separate;
  }

  table.alt tbody tr td {
    border: solid 1px;
    border-left-width: 0;
    border-top-width: 0;
  }

  table.alt tbody tr td:first-child {
    border-left-width: 1px;
  }

  table.alt tbody tr:first-child td {
    border-top-width: 1px;
  }

  table.alt thead {
    border-bottom: 0;
  }

  table.alt tfoot {
    border-top: 0;
  }

  table tbody tr {
    border-color: rgba(144, 144, 144, 0.25);
  }

  table tbody tr:nth-child(2n + 1) {
    background-color: rgba(144, 144, 144, 0.075);
  }

  table th {
    color: #666;
  }

  table thead {
    border-bottom-color: rgba(144, 144, 144, 0.25);
  }

  table tfoot {
    border-top-color: rgba(144, 144, 144, 0.25);
  }

  table.alt tbody tr td {
    border-color: rgba(144, 144, 144, 0.25);
  }

</style>
