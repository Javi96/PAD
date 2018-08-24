package com.pad.slaythespire;

import android.support.annotation.NonNull;
import android.support.v7.widget.CardView;
import android.support.v7.widget.RecyclerView;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import java.util.ArrayList;

public class ClassificationAdapter
        extends RecyclerView.Adapter<ClassificationAdapter.ViewHolderClassification>
        implements View.OnClickListener{

    private ArrayList<String> dataList;
    private View.OnClickListener listener;

    public ClassificationAdapter(ArrayList<String> dataList) {
        this.dataList = dataList;
    }

    // enlaza el adaptador con la lista de items
    @NonNull
    @Override
    public ViewHolderClassification onCreateViewHolder(@NonNull ViewGroup parent, int viewType) {
        View view = LayoutInflater.from(parent.getContext())
                .inflate(R.layout.list_players,null,false);
        view.setOnClickListener(this);
        return new ViewHolderClassification(view);
    }

    @Override
    public void onBindViewHolder(@NonNull ViewHolderClassification holder, int position) {
        holder.assignData(dataList.get(position));

    }

    @Override
    public int getItemCount() {
        return dataList.size();
    }

    @Override
    public void onClick(View v) {
        if(listener!=null){
            listener.onClick(v);
        }
    }

    public void setOnClickListener(View.OnClickListener listener){
        this.listener = listener;
    }

    public class ViewHolderClassification extends RecyclerView.ViewHolder {

        TextView textView;
        ImageView imageView;

        private CardView cardView;

        String url = "https://cdn.prod-carehubs.net/n1/802899ec472ea3d8/uploads/2017/02/a-watercolor-graphic-of-a-heart-in-pinks-and-purples-special-crop-1024x864.jpg";
        public ViewHolderClassification(View itemView) {
            super(itemView);
            textView = itemView.findViewById(R.id.card_template_name);
            //imageView = itemView.findViewById(R.id.card_template_image);
        }

        public void assignData(String s) {
            //textView.setText(s);
        }
    }
}
