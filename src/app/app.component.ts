import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import article from './models/article';
import { ArticleService } from './services/article.service';
import { CloudinaryService } from './services/cloudinary.service';
@Component({
  selector: 'case-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  // image
  imagen?: File;
  imagenMin?: File;
  newImg: boolean = false;
  // form
  radioGroupForm: FormGroup;
  articleForm: FormGroup;
  sortOptions: string[] =[ 'nombre', 'precioVenta'];
  sortOption: string
  // articles
  articles: article[] = [];
  article: any = {}
  constructor(private formBuilder: FormBuilder, 
    private articleService: ArticleService, 
    private cloudinaryService: CloudinaryService, 
    private modalService: NgbModal) {
    this.radioGroupForm = this.formBuilder.group({
      'asc': true
    });
    this.articleForm = this.formBuilder.group({
      'asc': true
    });
    this.sortOption = this.sortOptions[0];
    this.radioGroupForm.get('asc')?.valueChanges.subscribe(x =>{
      this.getArticles(x);
    });
    this.initForm()
  }
  ngOnInit() {
    this.getArticles(this.radioGroupForm.value['asc']);
  }
  onFileChange(event:any) {
    this.imagen = event.target.files[0];
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.newImg=true;
      this.imagenMin = evento.target.result;
    };
    if(this.imagen){
      fr.readAsDataURL(this.imagen);
    }
  }
  getArticles = (asc:boolean) => {
    this.articleService.getArticlesSort(asc,this.sortOption).subscribe(data => {
      this.articles = data;
      console.log(this.articles);
    })
  }
  changeSort = (index:number) => {
    this.sortOption = this.sortOptions[index]
    this.getArticles(this.radioGroupForm.value['asc']);
  }
  initForm = () => {
    this.articleForm = new FormGroup({
      name: new FormControl('', Validators.required),
      descripcion: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
      ]),
      codigo: new FormControl('', [
        Validators.required,
        Validators.minLength(5),
      ]),
      stock: new FormControl(10, Validators.required),
      price: new FormControl(4.90, Validators.required)
    });
  }
  open = (content: any) => {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
  }
  onCreate(): void {
    this.loadData();
    this.articleService.postArticle(this.article).subscribe(
      data => {
        console.log(data);
      },
      err => {
        console.log('Error:',err);
        
      }
    );
  }
  onSubmit = () => {
    if(this.imagen){
      console.log(this.article);
      this.cloudinaryService.uploadImage(this.imagen).subscribe(
        data => {
          console.log("Subido: ", data.message);
          this.article.imagen=data.message;
          this.onCreate()
  
        },
        err => {
          alert(err.error.mensaje);
        }
      );
    }
  }
  loadData = () => {
    this.article.nombre = this.articleForm.get('name')?.value;
    this.article.descripcion = this.articleForm.get('descripcion')?.value;
    this.article.codigo = this.articleForm.get('codigo')?.value;
    this.article.stock = this.articleForm.get('stock')?.value;
    this.article.precioVenta = this.articleForm.get('price')?.value;
  }
}
