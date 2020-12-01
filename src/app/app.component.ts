import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import {Square } from './square';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  grid: Square[][];
  direction;
  path;
  abs; 
  ord;
  squareimage='https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Square_-_black_simple.svg/500px-Square_-_black_simple.svg.png';
  aspimage='';
  submeted=false;
  aspi_style={};
  style={};
  appState;
  x_0: any;
  y_0: any;
  end;
  onSubmit(f: NgForm) {
    this.ord=f.value.y;
    this.abs=f.value.x;
    this.x_0=f.value.x_0-1;
    this.y_0=f.value.y_0-1;
    this.direction = f.value.dir;
    this.grid = [];
    this.path =f.value.path;
    
    this.submeted=true;
  }
  
  onStart(){
    let intervalId = setInterval(()=>{
      this.aspimage = `../assets/img/${this.direction}.png`;
      for(let i=0;i<this.abs;i++){
        this.grid[i] = [];
        for(let j=0;j<this.ord;j++){
          if(i==this.x_0 && j==this.y_0){
            this.grid[i][j] = new Square(i,j,this.aspi_style,this.aspimage)
          }else{
            this.grid[i][j] = new Square(i,j,this.style,this.squareimage);
          }
        }
      }
      if(this.path==''){
        clearInterval(intervalId);
        this.end=true;
      }else{
        let mouve = this.path.charAt(0);
        this.path = this.path.slice(1);
        console.log(this.path)
        if(mouve=='A'){
          if(this.direction=='N'){
            this.x_0-=1
          }else if(this.direction=='S'){
            this.x_0+=1
          }
          else if(this.direction=='E'){
            this.y_0+=1
          }
          else{
            this.y_0-=1
          }
        }else if(mouve=='D'){
          if(this.direction=='N'){
            this.direction='E'
          }else if(this.direction=='E'){
            this.direction='S'
          } else if(this.direction=='S'){
            this.direction='W'
          }else{
            this.direction='N'
          }
        }else{
          if(this.direction=='N'){
            this.direction='W'
          }else if(this.direction=='W'){
            this.direction='S'
          } else if(this.direction=='S'){
            this.direction='E'
          }else{
            this.direction='N'
          }
        }
      }
    },1000)
  }
}
